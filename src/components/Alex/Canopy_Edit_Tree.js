import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "../App/App.css";

var baseurl = "http://localhost:5000/canopy/";
	if(window.location.href.includes("localhost")) {
		baseurl = "http://localhost:5000/canopy/";
	}
	else {
		baseurl = "https://d23bykmxle9vsv.cloudfront.net/";
	}

// methods for updating data in the Flask app
// update information in the tree table
function putTree(url_input, tree_data) {
	axios.put(url_input, null, {params: tree_data})
	.then(function (response) {
		console.log(response.data)
	})
	.catch(function (error) {
		console.log(error);
	}) 
}

// methods for deleting data in the Flask app
// delete a tree record
function deleteTree(url_input, tree_data) {
	axios.delete(url_input, {params: tree_data})
	.then(function (response) {
		console.log(response.data)
	})
	.catch(function (error) {
		console.log(error);
	}) 
}

function Canopy_Edit_Node(props) {
	const navigate = useNavigate();
	const location = useLocation();

	// state definitions
	const [id, setID] = useState(location.state?.id);
	const [name, setName] = useState("Tree's Name");
	const [owner, setOwner] = useState("Tree's Owner");
	const [new_name, setNewName] = useState("Tree's New Name");
	const [json_data, setJSONData] = useState({});
	const [owned_nodes, setOwnedNodes] = useState({ids:[], names:[], dobs:[], ethnicities:[], conditions:[]});

	// get data from the tree table
	const getTree = async (url_input, tree_data) => {
		const {data} = await axios.get(url_input, {params: tree_data});
		// alert(JSON.stringify(data));
		setJSONData(data);
		setName(data.names[0]);
		setNewName(data.names[0]);
		setOwner(data.owners[0]);
	}

	// get data of the tree's nodes
	const getTreeNodes = async (url_input, tree_data) => {
		const {data} = await axios.get(url_input, {params: tree_data});
		// alert(JSON.stringify(data));
		setOwnedNodes(data);
	}

	// function for generating a table from the JSON response
	const generateTable = (response) => {
		let table = []
		let rows = []
		
		// Outer loop to create rows (one row for each id + 1 for the headers)
		for (let i = -1; i < response.ids.length; i++) {
			let columns = []

			// Inner loop to create columns (one column for each unique key in the table)
			for (let j = -1; j <= Object.keys(response).length; j++) {
				// if we're on the first row (headers)
				if(i == -1) {
					if(j == -1) {
						// we're on the first column
						columns.push(<td>{"IDs"}</td>)
					}
					else if(j < Object.keys(response).length) {
						if(Object.keys(response)[j] != "ids") {
							columns.push(<td>{Object.keys(response)[j]}</td>)
						}
					}
					else {
						// on the last column, empty cell
						columns.push(<td></td>)
					}
				}
				else {
					if(j == -1) {
						// we're on the first column
						columns.push(<td>{response.ids[i]}</td>)
					}
					else if(j < Object.keys(response).length) {
						// we're not on the first or last column
						if(Object.keys(response)[j] != "ids") {
							columns.push(<td>{response[Object.keys(response)[j]][i]}</td>)
						}
					}
					else {
						columns.push(<td>
										<Link to='/canopy/canopy_edit_node/' 
										state={{ id: response.ids[i], tree_id: location.state?.id }}>
													<button> Edit </button>
										</Link>
									</td>)
					}
				}
			}

			// Create the parent and add the children
			rows.push(<tr>{columns}</tr>)
		}

		table.push(<tbody>{rows}</tbody>)

		return table
	}

	useEffect(() => {
		getTree(baseurl + "tree/prod", { id:location.state?.id });
		getTreeNodes(baseurl + "tree_nodes/prod", { id:location.state?.id })
	}, []);
	
	return (
		<div className="App">
			<header className="App-header-primary">
				<h1>Edit Tree Information</h1>
			</header>
			<div>
				<form>
					<h3>
						Tree ID: { id }
					</h3>
					<br />
					
					<h3>
						Tree Name: { name }
					</h3>
					<label>
						New Name:
						<input
						name="new_name"
						type="text"
						value={new_name}
						onChange={e => setNewName(e.target.value)} />
					</label>
					<br /><br />

					<h3>
						Owner: { owner }
					</h3>
					<br />
				</form>

				<div>
					<button onClick={() => {
						putTree(baseurl + "tree/prod", {id: id, name: name, owner: owner, new_name: new_name})
						alert("Tree Record ID: " + id + " Saved!")
					}}>
						Save Tree Details
					</button>
				</div>

				<br />

				<div>
					<button onClick={() => {
						deleteTree(baseurl + "tree/prod", {id: id, name: name, owner: owner})
						alert("Tree Record ID: " + id + " Deleted!")
						navigate(-1)
					}}>
						Delete Tree ID: {id}
					</button>
				</div>

				<br /><br />

				<table border="1">
					{generateTable(owned_nodes)}
				</table>

				<br />
				
				<Link to="/canopy/canopy_new_node" state={{ tree_id: location.state?.id }}>
					<button> Add a New Patient to This Tree </button>
				</Link>

				<br /><br />

				<button onClick={() => {
					navigate(-1);
				}}> 
					Back 
				</button>
			</div>
		</div>
	);
}

export default Canopy_Edit_Node;

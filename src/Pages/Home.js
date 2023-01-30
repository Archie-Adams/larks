import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../components/App/App.css";

class Home extends Component {
	getEC2 = () => {
		var config = {
			method: "get",
			url: "https://ec2-3-249-104-153.eu-west-1.compute.amazonaws.com/",
			headers: {},
		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>Home</h1>
				</header>
				<body className="App-body">
					<Link to="/lanre">
						<button>Lanre's App</button>
					</Link>
					<Link to="/alex">
						<button>Alex's App</button>
					</Link>
					<Link to="/ramat">
						<button>Ramat's App</button>
					</Link>
					<Link to="/kevin">
						<button>Kevin's App</button>
					</Link>
					<Link to="/shreyas">
						<button>Shreyas' App</button>
					</Link>
					<button onClick={this.getEC2}> Get EC2 </button>
				</body>
			</div>
		);
	}
}

export default Home;

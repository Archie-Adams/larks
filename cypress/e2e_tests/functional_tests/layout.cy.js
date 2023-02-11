/* eslint-disable no-undef */


import { elements } from "../../support/elements";
import { registeredUser } from "../../support/users";

describe("Layout Testing", () => {

    // Modularise testing 2 2 1 layout on page, as will be repeated for many resolutions.
    function testingLayoutPortrait(){
        // Alex Logo => [Left of Kevin Logo, Above Lanre Logo]
        cy.get(elements.Home.alexAppLogo).should("be.leftOf", elements.Home.kevinAppLogo);
        cy.get(elements.Home.alexAppLogo).should("be.above", elements.Home.lanreAppLogo);

        // Kevin Logo => [Right of Alex Logo, Above Ramat Logo]
        cy.get(elements.Home.kevinAppLogo).should("be.rightOf", elements.Home.alexAppLogo);
        cy.get(elements.Home.kevinAppLogo).should("be.above", elements.Home.ramatAppLogo);

        // Lanre Logo => [left of Ramat logo, below Alex Logo, Above Shreyas Logo]
        cy.get(elements.Home.lanreAppLogo).should("be.below", elements.Home.alexAppLogo);
        cy.get(elements.Home.lanreAppLogo).should("be.above", elements.Home.shreyasAppLogo);
        cy.get(elements.Home.lanreAppLogo).should("be.leftOf", elements.Home.ramatAppLogo);

        // Ramat Logo => [Right of Lanre logo, below Kevin Logo, Above Shreyas Logo]
        cy.get(elements.Home.ramatAppLogo).should("be.below", elements.Home.kevinAppLogo);
        cy.get(elements.Home.ramatAppLogo).should("be.above", elements.Home.shreyasAppLogo);
        cy.get(elements.Home.ramatAppLogo).should("be.rightOf", elements.Home.lanreAppLogo);

        // Shreyas Logo => [Below All applications]
        cy.get(elements.Home.shreyasAppLogo).should("be.below", elements.Home.alexAppLogo);
        cy.get(elements.Home.shreyasAppLogo).should("be.below", elements.Home.kevinAppLogo);
        cy.get(elements.Home.shreyasAppLogo).should("be.below", elements.Home.lanreAppLogo);
        cy.get(elements.Home.shreyasAppLogo).should("be.below", elements.Home.ramatAppLogo);
    }

    function testingLayoutLandscape(){
        //Alex App => [left of every other app logo]
        cy.get(elements.Home.alexAppLogo).should("be.leftOf", elements.Home.kevinAppLogo);
        //Kevin App => [right of alex, left of ramat,lanre,shreyas]
        cy.get(elements.Home.kevinAppLogo).should("be.rightOf", elements.Home.alexAppLogo);
        cy.get(elements.Home.kevinAppLogo).should("be.leftOf", elements.Home.ramatAppLogo);

        //Lanre Aoo => [right of alex,kevin, left of shreyas, ramat]
        cy.get(elements.Home.lanreAppLogo).should("be.rightOf", elements.Home.kevinAppLogo);
        cy.get(elements.Home.lanreAppLogo).should("be.leftOf", elements.Home.ramatAppLogo);

        //Ramat App => [right of alex,kevin,lanre , left of shreyas]
        cy.get(elements.Home.ramatAppLogo).should("be.rightOf", elements.Home.lanreAppLogo);
        cy.get(elements.Home.ramatAppLogo).should("be.leftOf", elements.Home.shreyasAppLogo);
        
        //Shreyas App => [right of every other app]
        cy.get(elements.Home.shreyasAppLogo).should("be.rightOf", elements.Home.ramatAppLogo);
    }


    // Log into application to access home page before each test.
    beforeEach(() => {
        sessionStorage.clear()
        cy.visit("http://localhost:3000/");
        cy.get(elements.Login.Email).type(registeredUser.email);
		cy.get(elements.Login.Password).type(registeredUser.password);
		cy.get(elements.Login.Login_Button).click();
    })
	
  
    describe("Check Layout - 2-2-1 layout format", () => {
        it("Should be able to find all the application logos and the logout button on screen", () => {
            cy.url().should("eq", "http://localhost:3000/home");
            cy.get(elements.Home.kevinAppLogo).should("be.visible");
            cy.get(elements.Home.lanreAppLogo).should("be.visible");
            cy.get(elements.Home.shreyasAppLogo).should("be.visible");
            cy.get(elements.Home.ramatAppLogo).should("be.visible");
            cy.get(elements.Home.alexAppLogo).should("be.visible");
        })


        it("Should be displaying the page options in a 2 - 2 - 1 layout in a 1280x720 resolution", () => {
            cy.viewport(1280, 720)
            cy.url().should("eq", "http://localhost:3000/home");
            testingLayoutPortrait();
        })

        it("Should be displaying the page options in a 2 - 2 - 1 layout in a 1920x1080 resolution", () => {
            cy.viewport(1920, 1080)
            cy.url().should("eq", "http://localhost:3000/home");
            testingLayoutPortrait();
        })

        it("Should be displaying the page options in a 2 - 2 - 1 layout in a 414x896 resolution [iPhone XR]", () => {
            cy.viewport(414, 896); // iPhone XR Portrait Mode Resolution
            cy.url().should("eq", "http://localhost:3000/home");
            testingLayoutPortrait();
        })
        
        // Most common mobile viewport size according to:
        // https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design
        it("Should be displaying the page options in a 2 - 2 - 1 layout in a 360x800 resolution", () => {
            cy.viewport(360, 800)
            cy.url().should("eq", "http://localhost:3000/home");
            testingLayoutPortrait();
        })
    })


    describe("Check Layout - Row layout format", () => {
        it("Should be able to find all the application logos and the logout button on screen", () => {
            cy.url().should("eq", "http://localhost:3000/home");
            cy.get(elements.Home.kevinAppLogo).should("be.visible");
            cy.get(elements.Home.lanreAppLogo).should("be.visible");
            cy.get(elements.Home.shreyasAppLogo).should("be.visible");
            cy.get(elements.Home.ramatAppLogo).should("be.visible");
            cy.get(elements.Home.alexAppLogo).should("be.visible");
        })

        // This is the resolution at which they display in a single row, due to the image sizes
        it('Should Display logos in a single row when viewport height <= 450px and viewport width >= 660px', () => {
            cy.viewport(660, 450);
            cy.url().should("eq", "http://localhost:3000/home");
            testingLayoutLandscape();
        })

        it('Should Display logos in a single row when viewport - iphone xr - landscape mode', () => {
            cy.viewport(896, 414);
            cy.url().should("eq", "http://localhost:3000/home");
            testingLayoutLandscape();
        })

        it('Should Display logos in a single row when viewport - common mobile viewport size -  landscape mode', () => {
            cy.viewport(800, 360);
            cy.url().should("eq", "http://localhost:3000/home");
            testingLayoutLandscape();
        })

    })

})
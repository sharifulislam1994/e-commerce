import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar sticky="top" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">FlipMart</Navbar.Brand>

            <div className="w-100 ">
              <div className="form-outline w-25">
                <input
                  type="search"
                  id="form1"
                  placeholder="Search"
                  className="form-control text-align-center"
                />
              </div>
            </div>

            <Nav className="ms-auto">
              <Nav.Link color="white">
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </Nav.Link>
              <Nav.Link color="white">
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                  to="/product"
                >
                  Product
                </NavLink>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/product/:slug" element={<ProductDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

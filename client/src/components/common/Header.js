import React from "react";
import { Link, Route } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import ExpensesList from "../expenses/ExpensesList";
import CategoriesList from "../categories/CategoriesList";
import Reports from "../reports/Reports";

const Header = () => {
  return(
    <div>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Expenses Demo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Expenses</Nav.Link>
            <Nav.Link href="/categories">Categories</Nav.Link>
            <Nav.Link href="/reports">Reports</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/" component={ExpensesList} />
      <Route exact path="/categories" component={CategoriesList} />
      <Route exact path="/reports" component={Reports} />
    </div>
  );
}

export default Header;
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import {api} from "../../helpers/api";

class ManagerNavBar extends React.Component{

  constructor(){
    super();
    this.state = {
        username : null
    }
  }

  async componentDidMount(){
    try {
    const info = await api.get(`/managers/${localStorage.getItem("ManagerID")}`);
    this.setState({username : info.data.username});
    }catch(error){
      console.log("manager username could not be getted", error);
    }
  }


    render(){
        return(
        <Navbar bg="#cfcfd9" expand="lg">
        <Navbar.Brand>TipTopTournament</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavItem>
              {/*
              Because the token and ManagerId will be removed when 
              directing to /home it is actually like logout.
              --
              use as={Link} bc otherwise it will not push on the history stack
              */}
            <Nav.Link as={Link} to="/home">Logout</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={Link} to={`/manager/menu/${localStorage.getItem("ManagerID")}`}>
                Menu
              </Nav.Link>
            </NavItem>
          </Nav>
          <Navbar.Text>
              Signed in as: <a>{this.state.username}</a>
          </Navbar.Text>
        </Navbar.Collapse>
        
        </Navbar>

        )}


}
export default withRouter(ManagerNavBar);
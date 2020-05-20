import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import { api } from "../../helpers/api";
import { ManagerNavBarContext } from "./ManagerNavBarContext";

const ManagerNavBar = () => {
  const selected = useContext(ManagerNavBarContext); // selected means if a tournament in manager menu is selected
  console.log("selected", selected.selected);
  if (!selected.selected) {
    return (
      <Navbar bg="#cfcfd9" expand="lg">
        <Navbar.Brand>TipTopTournament</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavItem>
              <Nav.Link
                as={Link}
                to={`/manager/menu/${localStorage.getItem("ManagerID")}`}
              >
                Menu
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                as={Link}
                to={`/manager/createTournament/${localStorage.getItem(
                  "ManagerID"
                )}`}
              >
                Create Tournament
              </Nav.Link>
            </NavItem>
          </Nav>
          <NavItem>
            {/*
                Because the token and ManagerId will be removed when 
                directing to /home it is actually like logout.
                --
                use as={Link} bc otherwise it will not push on the history stack
                */}
            <Nav.Link as={Link} to="/home">
              Logout
            </Nav.Link>
          </NavItem>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar bg="#cfcfd9" expand="lg">
        <Navbar.Brand>TipTopTournament</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavItem>
              <Nav.Link
                as={Link}
                to={`/manager/menu/${localStorage.getItem("ManagerID")}`}
              >
                Menu
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                as={Link}
                to={`/manager/${localStorage.getItem(
                  "TournamentCode"
                )}/playerList`}
              >
                Participants
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                as={Link}
                to={`/manager/${localStorage.getItem(
                  "TournamentCode"
                )}/leaderBoard`}
              >
                Leaderboard
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                as={Link}
                to={`/manager/${localStorage.getItem(
                  "TournamentCode"
                )}/bracket`}
              >
                Bracket
              </Nav.Link>
            </NavItem>
          </Nav>
          <Navbar.Text>
            Signed in as: <a>heho</a>
          </Navbar.Text>
          <NavItem>
            {/*
            Because the token and ManagerId will be removed when 
            directing to /home it is actually like logout.
            --
            use as={Link} bc otherwise it will not push on the history stack
            */}
            <Nav.Link as={Link} to="/home">
              Logout
            </Nav.Link>
          </NavItem>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};
export default withRouter(ManagerNavBar);

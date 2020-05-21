import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import { api } from "../../helpers/api";

class ManagerNavBarExtended extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
    };
  }

  async componentDidMount() {
    const managerID = localStorage.getItem("ManagerID");
    try {
      const info = await api.get(`/managers/${managerID}`);
      this.setState({
        username: info.data.username,
      });
    } catch (error) {
      console.log("Manager username could not be getted", error);
    }
  }
  render() {
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
                to={`/emanager/${localStorage.getItem(
                  "TournamentCode"
                )}/playerList`}
              >
                Participants
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                as={Link}
                to={`/emanager/${localStorage.getItem(
                  "TournamentCode"
                )}/leaderBoard`}
              >
                Leaderboard
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                as={Link}
                to={`/emanager/${localStorage.getItem(
                  "TournamentCode"
                )}/bracket`}
              >
                Bracket
              </Nav.Link>
            </NavItem>
          </Nav>
          <Navbar.Text>
            Signed in as: <a>{this.state.username}</a>
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
}
export default withRouter(ManagerNavBarExtended);

import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import { api } from "../../helpers/api";

class ParticipantNavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      tournamentCode: null,
      credentials: null,
    };
  }

  async componentDidMount() {
    const participantID = localStorage.getItem("ParticipantID");
    try {
      const info = await api.get(`/participants/${participantID}`);
      this.setState({
        credentials: info.data.nachname + " " + info.data.vorname,
      });
    } catch (error) {
      console.log("Participants username could not be getted", error);
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
                to={`/participant/${localStorage.getItem(
                  "TournamentCode"
                )}/participantMenu`}
              >
                Menu
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                as={Link}
                to={`/participant/${localStorage.getItem(
                  "TournamentCode"
                )}/playerList`}
              >
                Participants
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                as={Link}
                to={`/participant/${localStorage.getItem(
                  "TournamentCode"
                )}/bracket`}
              >
                Bracket
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link
                as={Link}
                to={`/participant/${localStorage.getItem(
                  "TournamentCode"
                )}/leaderboard`}
              >
                Leaderboard
              </Nav.Link>
            </NavItem>
          </Nav>
          <Navbar.Text>
            Signed in as: <a>{this.state.credentials}</a>
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
export default withRouter(ParticipantNavBar);

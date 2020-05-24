import React from "react";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "../../views/design/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {TipTopTournamentLogo} from "../../views/design/TipTopTournamentLogo";

class Tournament extends React.Component {
  constructor() {
    super();
    this.state = {
      games: null,
      leaderBoardUsers: null,
      tournament: {
        tournamentState: "ACTIVE",
      },
    };
  }
  tournamentCode = null;
  counter = 0;
  managerID = localStorage.getItem("ManagerID");
  intervalID;

  handleClick(id) {
    if (this.isNumeric(id)) {
      this.props.history.push(
        `/emanager/${this.tournamentCode}/participants/${id}`
      );
    } else {
      this.props.history.push(`/emanager/${this.tournamentCode}/${id}`);
    }
  }

  handleClickOnPlayer = (participantID) => {
    this.props.history.push(
      `/emanager/${this.props.match.params.tournamentCode}/participants/${participantID}`
    );
  };

  renderPlayerList(participant) {
    return (
      <tr
        key={participant.participantID}
        onClick={() => this.handleClickOnPlayer(participant.participantID)}
      >
        <td>{participant.participantID}</td>
        <td>{participant.vorname}</td>
        <td>{participant.nachname}</td>
        <td>{participant.licenseNumber}</td>
      </tr>
    );
  }

  isNumeric(value) {
    return /^\d+$/.test(value);
  }

  goBackToMenu() {
    this.props.history.push(`/manager/menu/${this.managerID}`);
  }

  renderLeaderBoard(leaderBoardUser) {
    this.counter++;
    return (
      <tr
        key={leaderBoardUser["participant"].participantID}
        onClick={() =>
          this.handleClick(leaderBoardUser["participant"].participantID)
        }
      >
        <td>{this.counter}</td>
        <td>{leaderBoardUser["participant"].vorname}</td>
        <td>{leaderBoardUser["participant"].nachname}</td>
        <td>{leaderBoardUser.wins}</td>
        <td>{leaderBoardUser.losses}</td>
        <td>{leaderBoardUser.pointsConceded}</td>
        <td>{leaderBoardUser.pointsScored}</td>
      </tr>
    );
  }

  async endTournament() {
    alert("The tournament has now ended! You can still look at the statistics");
    try {
      await api.put(
        `/tournaments/${this.tournamentCode}/${this.managerID}/cancel`
      );
    } catch (error) {
      alert(
        `Something went wrong while ending the tournament: \n${handleError(
          error
        )}`
      );
    }
    this.setState({ tournament: { tournamentState: "ENDED" } });
    this.counter = 0;
  }
  async getTournamentData() {
    try {
      this.tournamentCode = this.props.match.params.tournamentCode;

      const responseTournamentStatus = await api.get(
        `/tournaments/${this.tournamentCode}`
      );
      this.setState({ tournament: responseTournamentStatus.data });

      const response = await api.get(
        `/tournaments/${this.tournamentCode}/leaderboard`
      );

      //response returns participants, with their wins e.g. {{participantObj1, wins1}, {participantObj2, wins2}}
      this.setState({ leaderBoardUsers: response.data });
      this.counter = 0;
      const responseBracket = await api.get(
        `/tournaments/${this.tournamentCode}/bracket`
      );

      this.setState({ games: responseBracket.data });

      this.intervalID = setTimeout(this.getTournamentData.bind(this), 5000);
    } catch (error) {
      alert(
        `Something went wrong while fetching the tournament: \n${handleError(
          error
        )}`
      );
    }
  }
  componentWillUnmount() {
    /*
     --> unmounting this component
     so it does not interfere with other components
    */
    clearTimeout(this.intervalID);
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.getTournamentData();
  }

  render() {
    return (
      <Container className="custom-container2">
        {!this.state.games ||
        !this.state.leaderBoardUsers ||
        this.state.leaderBoardUsers.length === 0 ? (
            <Row className="justify-content-md-center">
              <Col md="auto" />
              <Col xs={12} sm={12} md={8}>
                <TipTopTournamentLogo
                    style={{
                      display: "block",
                      margin: "auto",
                      marginTop: "15px",
                      preserveAspectRatio: "xMinYMin slice",
                      height: "60%",
                      width: "60%",
                    }}
                />
                <h2
                    className="custom1"
                    style={{ color: "#2F80ED", textAlign: "center" }}
                >
                  {this.state.tournament.tournamentName} -{" "}
                  {this.state.tournament.tournamentState}
                </h2>
              </Col>
              <Col md="auto" />
            <Row>
            <Col>
              <Card style={{ background: "#F3F3FF", marginTop: "15px" }}>
                <Card.Body>
                  <Card.Title> Playerlist </Card.Title>
                  <Card.Subtitle style={{ color: "red" }}>
                    No players have joined yet!
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ background: "#F3F3FF", marginTop: "15px" }}>
                <Card.Body>
                  <Card.Title> Leaderboard </Card.Title>
                  <Card.Subtitle style={{ color: "red" }}>
                    No players have joined yet!
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Button
              disabled={
                this.state.leaderBoardUsers ||
                (this.state.tournament.tournamentState != "ACTIVE")
              }
              width="100%"
              style={{ marginTop: "100px" }}
              onClick={() => this.handleClick("bracket")}
            >
              Bracket
            </Button>
            <Button
              style={{ marginTop: "30px" }}
              width="100%"
              type="button"
              onClick={() => {
                this.goBackToMenu();
              }}
            >
              Back to Menu
            </Button>
            <Button
              style={{ marginTop: "30px" }}
              width="100%"
              type="button"
              onClick={() => {
                this.endTournament();
              }}
            >
              End Tournament
            </Button>
            </Row>
          </Row>
        ) : (
            <Row className="justify-content-md-center">
              <Col md="auto" />
              <Col xs={12} sm={12} md={8}>
                <TipTopTournamentLogo
                    style={{
                      display: "block",
                      margin: "auto",
                      marginTop: "15px",
                      preserveAspectRatio: "xMinYMin slice",
                      height: "60%",
                      width: "60%",
                    }}
                />
                <h2
                    className="custom1"
                    style={{ color: "#2F80ED", textAlign: "center" }}
                >
                  {this.state.tournament.tournamentName} -{" "}
                  {this.state.tournament.tournamentState}
                </h2>
              </Col>
              <Col md="auto" />
          <Row>
            <Col style={{paddingBottom:"15px" }}>
              <Card style={{ background: "#F3F3FF", marginTop: "15px" }}>
                <Card.Body>
                  <Card.Title onClick={() => this.handleClick("playerList")}>
                    {" "}
                    Participants{" "}
                  </Card.Title>
                  <div>
                    <Table bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Licensenumber</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.leaderBoardUsers.map((playerObject) =>
                          this.renderPlayerList(playerObject["participant"])
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col style={{paddingBottom:"15px" }}>
              <Card style={{ background: "#F3F3FF", marginTop: "15px" }}>
                <Card.Body>
                  <Card.Title onClick={() => this.handleClick("leaderBoard")}>
                    {" "}
                    Leaderboard{" "}
                  </Card.Title>
                  <div>
                    <Table bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Wins</th>
                          <th>Losses</th>
                          <th>Sets conceded</th>
                          <th>Sets scored</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.leaderBoardUsers.map((leaderBoardUser) => {
                          return this.renderLeaderBoard(leaderBoardUser);
                        })}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Button
              style={{ marginLeft: "220px", marginTop: "15px" }}
              width="25%"
              type="button"
              onClick={() => {
                this.goBackToMenu();
              }}
            >
              Back to Menu
            </Button>
            <Button
              width="25%"
              style={{ marginLeft: "30px", marginTop: "15px" }}
              onClick={() => this.handleClick("bracket")}
            >
              Bracket
            </Button>
            <Button
              style={{ marginLeft: "30px", marginTop: "15px" }}
              width="25%"
              type="button"
              onClick={() => {
                this.endTournament();
              }}
            >
              End Tournament
            </Button>
          </Row>
          </Row>
        )}
      </Container>
    );
  }
}

export default withRouter(Tournament);

import React from "react";
import {Redirect, withRouter} from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import Form from 'react-bootstrap/Form'
import Map from './Map'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { api, handleError } from "../../helpers/api";
import Card from 'react-bootstrap/Card'

class CreateTournament extends React.Component {
  constructor() {
    super();
    this.state = {
      amountOfPlayers: 2,
      startTime: null,
      informationBox: null,
      tournamentName: null,
      tournamentMode: 'K.O.',
      breakDuration: 10,
      gameDuration: 20,
      numberTables: 2,
  };
  }

handleInputChange(key, value) {
  // Example: if the key is username, this statement is the equivalent to the following one:
  // this.setState({'username': value});
  this.setState({ [key]: value });
}
  async sendTournamentDetails() {

    try {
      const requestBody = JSON.stringify({
        breakDuration: this.state.breakDuration,
        gameDuration: this.state.gameDuration,
        startTime: this.state.startTime,
        numberTables: this.state.numberTables,
        amountOfPlayers: this.state.amountOfPlayers,
        informationBox: this.state.informationBox,
        tournamentName: this.state.tournamentName,
        managerId: localStorage.getItem("ManagerID"),
        location: localStorage.getItem("address"),
        //tournamentMode: this.state.tournamentMode, //TODO In next sprints we can add further tournament modes
      });

        const response = await api.post("/tournaments", requestBody);
        console.log(response);
        alert("Your Tournamentcode is: " + response.data);
        this.props.history.goBack();

    } catch (error) {
      alert(`Something went wrong during the creation of the tournament: \n${handleError(error)}`);
    }
  }

  render() {
    return (
      <Container className= "custom-container2">
        <Row>
            <Col>
              <h1 style={{ textAlign: "center", color: "#2F80ED"}}>Neues Tournament erstellen</h1>
            </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="ControlInput1">
                <Form.Label>Tournament Name</Form.Label>
                <Form.Control type="TournamentName" placeholder="Tournament Name" onChange={e => {this.handleInputChange("tournamentName", e.target.value);}}/>
              </Form.Group>
              <Form.Group controlId="ControlInput1">
                <Form.Label>Startzeit</Form.Label>
                <Form.Control type="startTime" placeholder="Startzeit e.g(08:00)" onChange={e => {this.handleInputChange("startTime", e.target.value);}}/>
              </Form.Group>
              <Form.Group controlId="ControlSelect1">
                <Form.Label>Spielzeit</Form.Label>
                <Form.Control as="select" onChange={e => {this.handleInputChange("gameDuration", e.target.value);}}>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="ControlSelect1">
                <Form.Label>Pausenzeit</Form.Label>
                <Form.Control as="select" onChange={e => {this.handleInputChange("breakDuration", e.target.value);}}>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="ControlSelect1">
                <Form.Label>Anzahl Spieler</Form.Label>
                <Form.Control as="select" onChange={e => {this.handleInputChange("amountOfPlayers", e.target.value);}}>
                  <option>2</option>
                  <option>4</option>
                  <option>8</option>
                  <option>16</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="ControlSelect1">
                <Form.Label>Anzahl Spieltische</Form.Label>
                <Form.Control as="select" onChange={e => {this.handleInputChange("numberTables", e.target.value);}}>
                  <option>2</option>
                  <option>4</option>
                  <option>8</option>
                  <option>16</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="ControlTextarea1">
                <Form.Label>Tournamentbeschreibung</Form.Label>
                <Form.Control as="textarea" rows="3" onChange={e => {this.handleInputChange("informationBox", e.target.value);}}/>
              </Form.Group>
              <Card border= "primary" >
                <Card.Title>  Setze einen Standort fest</Card.Title>
                <Card.Body> 
                  <Card.Text>
                    Suche die gewünschte Ortschaft auf der Karte mit der Suchleiste und verschiebe dann denn Marker bis die gewünschte Adresse angezeigt wird.
                  </Card.Text>
                </Card.Body>
              </Card>
              <div style={{marginBottom: '60px'}}>
                <Map
                  google={this.props.google}
                  center={{lat: 47.36667, lng: 8.55}}
                  height='300px'
                  zoom={15}
                />
              </div>
              <Row>
                <Col/>
                <Col>
                  <Button
                      style={{marginLeft: '60px', color: "#F3F3FF"}}
                      disabled={!this.state.startTime||!this.state.tournamentName||!this.state.gameDuration||!this.state.breakDuration
                      ||!this.state.amountOfPlayers||!this.state.startTime||!localStorage.getItem("address")}
                      type="submit" onClick={() => {
                    this.sendTournamentDetails(); }}
                  >Tournament erstellen</Button>
                </Col>
                <Col/>
              </Row>
            </Form>
          </Col>
        </Row>
        
        
        
      </Container>      
    );
  }

}

export default withRouter(CreateTournament);

import React from "react";
import { withRouter } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import Form from 'react-bootstrap/Form'
import Map from './Map'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ButtonContainer } from "../../views/design/ButtonContainer"
import { api, handleError } from "../../helpers/api";
import Card from 'react-bootstrap/Card'

class CreateTournament extends React.Component {
  constructor() {
    super();
    this.state = {
      amountOfPlayers: 2,
      startTime: '',
      informationBox: '',
      tournamentName: '',
      tournamentMode: 'K.O.'
  };
  }

handleInputChange(key, value) {
  // Example: if the key is username, this statement is the equivalent to the following one:
  // this.setState({'username': value});
  this.setState({ [key]: value });
}
  async sendtournamentdetails() {

    let response;
    try {
      const requestBody = JSON.stringify({
        //breakDuration: null,
        //gameDuration: null,
        startTime: this.state.startTime,
        numberTables: this.numberTables,
        amountPlayers: this.state.amountPlayers,
        informationBox: this.state.informationBox,
        tournamentName: this.state.tournamentName,
        //tournamentMode: this.state.tournamentMode,
        location: localStorage.getItem("address")
      });
        const response = await api.post("/tournaments");
        const {managerID} = localStorage.getItem("ManagerID");
        this.props.history.push(`/managerMenu/${managerID}`);
      

    } catch (error) {
      alert(`Something went wrong during the creation of the torunament: \n${handleError(error)}`);
    }
  }

  render() {
    return (
      <Container className= "custom-container2">
        <Row>
            <Col>
              <h1 style={{ textAlign: "center" }}>Neues Tournament erstellen</h1>
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
                <Form.Control type="startTime" placeholder="Startzeit" onChange={e => {this.handleInputChange("startTime", e.target.value);}}/>
              </Form.Group>
              <Form.Group controlId="ControlSelect1">
                <Form.Label>Anzahl Spieler</Form.Label>
                <Form.Control as="select" onChange={e => {this.handleInputChange("amountPlayers", e.target.value);}}>
                  <option>2</option>
                  <option>4</option>
                  <option>8</option>
                  <option>16</option>
                
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="ControlTextarea1">
                <Form.Label>Tournamentbeschreibung</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
              <Card border= "primary" >
                <Card.Title>  Setze einen Standort fest</Card.Title>
                <Card.Body> 
                  <Card.Text>
                    Suche die gewünschte Ortschaft auf der Map mit der Suchleiste und verschiebe dann denn Marker bis die gewünschte Adresse angezeigt wird.
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
              <Button  disabled={!this.state.tournamentName||!this.state.amountPlayers||!this.state.startTime||!localStorage.getItem("address")} type="submit" onClick={() => {
                  this.sendtournamentdetails();}}>Tournament erstellen</Button> 
            </Form>
          </Col>
        </Row>
        
        
        
      </Container>      
    );
  }

}

export default withRouter(CreateTournament);

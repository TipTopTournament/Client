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


class CreateTournament extends React.Component {
  constructor() {
    super();
    this.state = {
      amountOfPlayers: null,
      startTime: '',
      informationBox: '',
      tournamentName: '',
      tournamentMode: 'K.O.'
  };
  }
/*

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);        
    event.preventDefault();
  }
*/  

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
        numberOfTables: null,
        amountOfPlayers: this.state.amountOfPlayers,
        informationBox: this.state.informationBox,
        tournamentName: this.state.tournamentName,
        //tournamentMode: this.state.tournamentMode,
        location: localStorage.getItem("address")
      });
        //response = await api.put("/tournamentCrreationsomething", requestBody);
        this.props.history.push(`/something`);
      

    } catch (error) {
      alert(`Something went wrong during tournamnet creation: \n$`);
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
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Tournament Name</Form.Label>
          <Form.Control type="TournamentName" placeholder="Tournament Name" onChange={e => {this.handleInputChange("tournamentName", e.target.value);}}/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Startzeit</Form.Label>
          <Form.Control type="startTime" placeholder="start Time" onChange={e => {this.handleInputChange("startTime", e.target.value);}}/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Anzahl Spieler</Form.Label>
          <Form.Control as="select" onChange={e => {this.handleInputChange("amountOfPlayers", e.target.value);}}>
            <option>2</option>
            <option>4</option>
            <option>8</option>
            <option>16</option>
          
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Tournamentbeschreibung</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
        <Map
          google={this.props.google}
          center={{lat: 46.5204, lng: 8.8567}}
          height='300px'
          zoom={9} />
         
      </Form>
      </Col>
      </Row>
      <Row>
          <Col>
          <ButtonContainer>
                    <Button  disabled={!this.state.tournamentName||!this.state.amountOfPlayers||!this.state.startTime||!localStorage.getItem("address")} type="submit" onClick={() => {
          alert('Your favorite flavor is: ' + this.state.tournamentName);}}>Tournament erstellen</Button> 
          </ButtonContainer>
          </Col>
      </Row>
      
     
      
    </Container>
      
    );
  }

}

export default withRouter(CreateTournament);

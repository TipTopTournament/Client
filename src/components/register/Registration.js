import React from "react";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import { ButtonContainer } from "../../views/design/ButtonContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Header from "../../views/Header";

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: null,
      vorname: null,
      nachname: null,
      username: null,
      password: null,
      licenseNumber: null,
      user : null,
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async register(id) {
    if (id === "Manager") {
      try {
        const requestBody = JSON.stringify({
          username: this.state.username,
          vorname: this.state.vorname,
          nachname: this.state.nachname,
          password: this.state.password
        });
        //Request to /managers to create a new manager
        await api.post("/managers", requestBody);
        // Register successfully worked --> navigate to the route /login in the TournamentRouter
        this.props.history.push(`/login/manager`);
      } catch (error) {
        alert(`Something went wrong during the Registration: \n${handleError(error)}`);
      }
    } else {
      try {
        const requestBody = JSON.stringify({
          vorname: this.state.vorname,
          nachname: this.state.nachname,
          password: this.state.password,
          licenseNumber: this.state.licenseNumber
        });
        //Request to /participants to create a new player
        const response = await api.post("/participants", requestBody);

        if (id === "PlayerNoLicense") {
          alert("Your new licenseNumber: " + response.data.licenseNumber);
        }
        // Register successfully worked --> navigate to the route /login in the TournamentRouter
        this.props.history.push(`/login/participant`);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
    }
  }

  formControl(labelName, stateName, type){
    return (
        <Form.Group>
          <Form.Label>{labelName}</Form.Label>
          <Form.Control
              type={type}
              placeholder="Enter here ..."
              onChange={e => {
                this.handleInputChange(`${stateName}`, e.target.value);
              }}
          />
        </Form.Group>
    )
  }

  buttonBack(){
    return (
    <Button
        width="50%"
        type="button"
        onClick={() => {
          this.props.history.goBack();
        }}
    >
      Back
    </Button>)
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  componentDidMount() {
    localStorage.removeItem("token");
  }

  render() {
    return (
      <Container className= "custom-container2">
        <Header/>
        <Row className="justify-content-md-center">
          <Col md="auto" />
          <Col xs={12} sm={12} md={8}>
            <Tabs defaultActiveKey="Manager" style={{ margin: "0 auto" }}>
              <Tab eventKey="Manager" title="Manager">
                <Form style={{ align: "center" }}>
                  {this.formControl("First name", "vorname", "")}
                  {this.formControl("Last name", "nachname", "")}
                  {this.formControl("Username", "username", "")}
                  {this.formControl("Password", "password", "password")}
                  <ButtonContainer>
                    <Button
                      type="button"
                      disabled={!this.state.username || !this.state.vorname || !this.state.nachname || !this.state.password}
                      width="50%"
                      onClick={() => {
                        this.register("Manager");
                      }}>Register
                    </Button>
                    {this.buttonBack()}
                  </ButtonContainer>
                </Form>
              </Tab>
              <Tab eventKey="PlayerNoLicense" title="PlayerNoLicense">
                <Form style={{ align: "center" }}>
                  {this.formControl("First name", "vorname", "")}
                  {this.formControl("Last name", "nachname", "")}
                  {this.formControl("Password", "password", "password")}
                  <ButtonContainer>
                    <Button
                      type="button"
                      disabled={!this.state.vorname || !this.state.nachname || !this.state.password}
                      width="50%"
                      onClick={() => {
                        this.register("PlayerNoLicense");
                      }}>Register
                    </Button>
                    {this.buttonBack()}
                  </ButtonContainer>
                </Form>
              </Tab>
              <Tab eventKey="PlayerWithLicense" title="PlayerWithLicense">
                <Form style={{ align: "center" }}>
                  {this.formControl("First name", "vorname", "")}
                  {this.formControl("Last name", "nachname", "")}
                  {this.formControl("Licensenumber", "licenseNumber", "")}
                  {this.formControl("Password", "password", "password")}
                  <ButtonContainer>
                    <Button
                      disabled={!this.state.vorname || !this.state.nachname || !this.state.password || !this.state.licenseNumber}
                      type="button"
                      width="50%"
                      onClick={() => {
                        this.register("Player");
                      }}>Register
                    </Button>
                    {this.buttonBack()}
                  </ButtonContainer>
                </Form>
              </Tab>
            </Tabs>
          </Col>
          <Col md="auto" />
        </Row>
      </Container>
    );
  }
}

export default withRouter(Registration);

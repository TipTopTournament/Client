import React from "react";
import { api, handleError } from "../../helpers/api";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Form from "react-bootstrap/Form";
import Manager from "../shared/models/Manager";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      licenseNumber: null,
      managerID:null,
    };
  }
  /**
   * HTTP PUT request is sent to the backend.
   * If the request is successful, a user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async login(is_manager) {

    let response;
    try {
      if (is_manager) {
        const requestBody = JSON.stringify({
          username: this.state.username,
          password: this.state.password
        });
        response = await api.put("/managers/login", requestBody);
        // Get the returned manager and update a new object.
        const manager = new Manager(response.data) ;
        // Store the token into the local storage.
        localStorage.setItem("token", manager.token);
        const {managerID} = manager.managerID;
        this.props.history.push(`/managerMenu/${managerID}`);
      } else {
        const requestBody1 = JSON.stringify({
          licenseNumber: this.state.licenseNumber,
          password: this.state.password
        });
        console.log("requestBody", requestBody1);
        response = await api.put("/participants/login", requestBody1);
        // Get the returned user and update a new object.
        const user = new User(response.data);
        // Store the token into the local storage.
        localStorage.setItem("token", user.token);
        // store the generated ID in the local storage.
        localStorage.setItem("ParticipantID", user.participantID);
        // Login successfully worked --> navigate to the route /tournamentCode in the TournamentRouter
        this.props.history.push(`/tournamentCode`);
      }

    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  componentDidMount() {}

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{ textAlign: "center" }}>TipTopTournament</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto" />
          <Col xs={12} sm={12} md={8}>
            <Tabs defaultActiveKey="Player" style={{ margin: "0 auto" }}>
              <Tab eventKey="Player" title="Player">
                <Form>
                  <Form.Group>
                    <Form.Label>Lizenznummer</Form.Label>
                    <Form.Control
                      type="licenseNumber"
                      placeholder="z.B.: 908147"
                      onChange={e => {
                        this.handleInputChange("licenseNumber", e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={e => {
                        this.handleInputChange("password", e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Button type="button"
                    disabled={!this.state.licenseNumber || !this.state.password}
                    width="auto"
                    onClick={() => {
                      this.login(false);
                    }}
                  >
                    Als Spieler einloggen
                  </Button>
                </Form>
              </Tab>
              {/*

              <Label>Username</Label>
              <InputField
                placeholder="Enter here.."
                onChange={e => {
                  this.handleInputChange("username", e.target.value);
                }}
              />
              <Label>Password</Label>
              <InputField
                type="password"
                placeholder="Enter here.."
                onChange={e => {
                  this.handleInputChange("password", e.target.value);
                }}
              />
              <ButtonContainer>
                <Button
                  disabled={!this.state.username || !this.state.password}
                  width="50%"
                  onClick={() => {
                    this.login(false);
                  }}
                >
                  Login as a participant
                </Button>
                <Button
                  width="50%"
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                >
                  Back
                </Button>
              </ButtonContainer>
            </Tab>
            <Tab eventKey="Manager" title="Manager">
              <Label>Username</Label>
              <InputField
                placeholder="Enter here.."
                onChange={e => {
                  this.handleInputChange("username", e.target.value);
                }}
              />
              <Label>Password</Label>
              <InputField
                placeholder="Enter here.."
                onChange={e => {
                  this.handleInputChange("password", e.target.value);
                }}
              />
              <ButtonContainer>
                <Button
                  disabled={!this.state.username || !this.state.password}
                  width="50%"
                  onClick={() => {
                    this.login(true);
                  }}
                >
                  Login as a manager
                </Button>
                <Button
                  width="50%"
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                >
                  Back
                </Button>
              </ButtonContainer>


                */}

              <Tab eventKey="Manager" title="Manager">
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="username"
                      placeholder="Username"
                      onChange={e => {
                        this.handleInputChange("username", e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={e => {
                        this.handleInputChange("password", e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="eingeloggt bleiben" />
                    {/*TODO: eingeloggt bleiben feature*/}
                  </Form.Group>
                  <Button type="button"
                    disabled={!this.state.username || !this.state.password}
                    width="auto"
                    onClick={() => {
                      this.login(true);
                    }}
                  >
                    Als Manager einloggen
                  </Button>
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

export default withRouter(Login);

import React from "react";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import { InputField } from "../../views/design/InputField";
import { Title } from "../../views/design/Title";
import { Label } from "../../views/design/Label";
import { ButtonContainer } from "../../views/design/ButtonContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

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
      is_manager: false,
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
        this.props.history.push(`/login`);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
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
        console.log(response.data);
        if (id === "PlayerNoLicense") {
          alert("Your new licenseNumber: " + response.data.licenseNumber);
        }
        // Register successfully worked --> navigate to the route /login in the TournamentRouter
        this.props.history.push(`/login`);
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
    }
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  handleCheckClick = () => {
    this.setState({ is_manager: !this.state.is_manager });
  };

  componentDidMount() {}

  render() {
    return (
      <Container className= "custom-container2">
        <p className="text-center">
          <Row>
            <Col>
              <Title>TIPTOPTournament</Title>
            </Col>
          </Row>
        </p>
        <Row className="justify-content-sm-center">
          <Col md="auto" />
          <Col xs={12} sm={12}>
            <Tabs defaultActiveKey="Manager" style={{ margin: "0 auto" }}>
              <Tab eventKey="Manager" title="Manager">
                <Form style={{ align: "center" }}>
                  <Form.Group>
                    <Form.Label>Vorname</Form.Label>
                    <Form.Control
                        type="vorname"
                        placeholder="Enter here ..."
                        onChange={e => {
                          this.handleInputChange("vorname", e.target.value);
                        }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Nachname</Form.Label>
                    <Form.Control
                        type="nachname"
                        placeholder="Enter here ..."
                        onChange={e => {
                          this.handleInputChange("nachname", e.target.value);
                        }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username"
                        placeholder="Enter here ..."
                        onChange={e => {
                          this.handleInputChange("username", e.target.value);
                        }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter here ..."
                        onChange={e => {
                          this.handleInputChange("password", e.target.value);
                        }}
                    />
                  </Form.Group>
                  <ButtonContainer>
                    <Button
                      type="button"
                      disabled={
                        !this.state.username ||
                        !this.state.vorname ||
                        !this.state.nachname ||
                        !this.state.password
                      }
                      width="50%"
                      onClick={() => {
                        this.register("Manager");
                      }}
                    >
                      Register
                    </Button>
                    <Button
                      width="50%"
                      type="button"
                      onClick={() => {
                        this.props.history.goBack();
                      }}
                    >
                      Back
                    </Button>
                  </ButtonContainer>
                </Form>
              </Tab>
              <Tab eventKey="PlayerNoLicense" title="PlayerNoLicense">
                <Form style={{ align: "center" }}>
                  <Form.Group>
                    <Form.Label>Vorname</Form.Label>
                    <Form.Control
                        type="vorname"
                        placeholder="Enter here ..."
                        onChange={e => {
                          this.handleInputChange("vorname", e.target.value);
                        }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Nachname</Form.Label>
                    <Form.Control
                        type="nachname"
                        placeholder="Enter here ..."
                        onChange={e => {
                          this.handleInputChange("nachname", e.target.value);
                        }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter here ..."
                        onChange={e => {
                          this.handleInputChange("password", e.target.value);
                        }}
                    />
                  </Form.Group>
                  <ButtonContainer>
                    <Button
                      type="button"
                      disabled={
                        !this.state.vorname ||
                        !this.state.nachname ||
                        !this.state.password
                      }
                      width="50%"
                      onClick={() => {
                        this.register("PlayerNoLicense");
                      }}
                    >
                      Register
                    </Button>
                    <Button
                      width="50%"
                      type="button"
                      onClick={() => {
                        this.props.history.goBack();
                      }}
                    >
                      Back
                    </Button>
                  </ButtonContainer>
                </Form>
              </Tab>
              <Tab eventKey="PlayerWithLicense" title="PlayerWithLicense">
                <Form style={{ align: "center" }}>
                  <Form.Group>
                    <Form.Label>Vorname</Form.Label>
                    <Form.Control
                        type="vorname"
                        placeholder="Enter here ..."
                        onChange={e => {
                          this.handleInputChange("vorname", e.target.value);
                        }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Nachname</Form.Label>
                    <Form.Control
                        type="nachname"
                        placeholder="Enter here ..."
                        onChange={e => {
                          this.handleInputChange("nachname", e.target.value);
                        }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter here ..."
                        onChange={e => {
                          this.handleInputChange("password", e.target.value);
                        }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Licensenumber</Form.Label>
                    <Form.Control
                        type="licensenumber"
                        placeholder="Enter here ..."
                        onChange={e => {
                          this.handleInputChange("licensenumber", e.target.value);
                        }}
                    />
                  </Form.Group>
                  <ButtonContainer>
                    <Button
                      type="button"
                      width="50%"
                      onClick={() => {
                        this.register("Player");
                      }}
                    >
                      Register
                    </Button>
                    <Button
                      width="50%"
                      type="button"
                      onClick={() => {
                        this.props.history.goBack();
                      }}
                    >
                      Back
                    </Button>
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

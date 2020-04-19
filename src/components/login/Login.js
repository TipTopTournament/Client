import React from "react";
import { BaseContainer } from "../../helpers/layout";
import { api, handleError } from "../../helpers/api";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import { Form } from "../../views/design/Form";
import { InputField } from "../../views/design/InputField";
import { Title } from "../../views/design/Title";
import { FormContainer } from "../../views/design/FormContainer";
import { ButtonContainer } from "../../views/design/ButtonContainer";
import { Label } from "../../views/design/Label";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null
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
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });

      if (is_manager) {
        response = await api.put("/managers/login", requestBody);
      } else {
        response = await api.put("/participants/login", requestBody);
      }

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem("token", user.token);

      // Login successfully worked --> navigate to the route /tournamentCode in the TournamentRouter
      this.props.history.push(`/tournamentCode`);
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
        <BaseContainer>
          <Title>TIPTIPTournament</Title>
          <FormContainer>
            <Form>
              <div>
                <Title>TIPTIPTournament</Title>
                <Tabs>
                  <TabList>
                    <Tab>Player</Tab>
                    <Tab>Manager</Tab>
                  </TabList>
                  <TabPanel>
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
                  </TabPanel>
                  <TabPanel>
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
                  </TabPanel>
                </Tabs>
              </div>
            </Form>
          </FormContainer>
        </BaseContainer>
      </Container>
    );
  }
}

export default withRouter(Login);

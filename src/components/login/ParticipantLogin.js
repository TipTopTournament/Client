import React from "react";
import { api, handleError } from "../../helpers/api";
import User from "../shared/models/User";
import {withRouter} from "react-router-dom";
import { Button } from "../../views/design/Button";
import UserStatusEnum from "../shared/UserStatusEnum";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Header from "../../views/Header";


class ParticipantLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      licenseNumber: null,
      managerID:null,
      participantID: null,
    };
  }
  /**
   * HTTP PUT request is sent to the backend.
   * If the request is successful, a user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async login() {
    try {
        const requestBody = JSON.stringify({
          licenseNumber: this.state.licenseNumber,
          password: this.state.password
        });

        let response = await api.put("/participants/login", requestBody);

        // Get the returned user and update a new object.
        const user = new User(response.data);

        //Check whether user is already signed up in a tournament
        let responseUserHasCode = await api.get(`/participants/${user.participantID}`);
        if (responseUserHasCode.data.code){
          localStorage.setItem("TournamentCode", responseUserHasCode.data.code);
        }

        localStorage.setItem("token", user.token);
        localStorage.setItem("ParticipantID", user.participantID);

        const requestBodyStatus = JSON.stringify(({
            userStatus: UserStatusEnum.ONLINE,
            token: localStorage.getItem("token")
        }));
        await api.put(`/participants/${localStorage.getItem("ParticipantID")}`, requestBodyStatus);

        // ParticipantLogin successfully worked --> navigate to the route /tournamentCode in the TournamentRouter
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

  formControl(labelName, stateName, type, placeholder){
    return (
        <Form.Group>
            <Form.Label>{labelName}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                onChange={e => {
                    this.handleInputChange(`${stateName}`, e.target.value);
                }}
            />
        </Form.Group>
    )
  }

  componentDidMount() {}

  render() {
    return (
      <Container className= "custom-container2">
        <Header/>
        <Row className="justify-content-md-center">
          <Col md="auto" />
          <Col xs={12} sm={12} md={8}>
                <Form>
                    {this.formControl("License number", "licenseNumber", "","e.g. 908147" )}
                    {this.formControl("Password", "password", "password","Password")}
                </Form>
              <Row>
                  <Col/>
                  <Col>
                      <Button
                          style={{marginTop:"30px"}}
                          type="button"
                          disabled={!this.state.licenseNumber || !this.state.password}
                          width="100%"
                          onClick={() => {
                              this.login();
                          }}
                      >Login
                      </Button>
                    <Button
                        style={{marginTop:"15px"}}
                        type="button"
                        width="100%"
                        onClick={() => {
                            this.props.history.goBack();
                        }}
                    >Back
                    </Button>
                  </Col>
                  <Col/>
              </Row>
          </Col>
          <Col md="auto" />
        </Row>
      </Container>
    );
  }
}

export default withRouter(ParticipantLogin);

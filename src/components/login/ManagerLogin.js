import React from "react";
import { api, handleError } from "../../helpers/api";
import {withRouter} from "react-router-dom";
import { Button } from "../../views/design/Button";
import UserStatusEnum from "../shared/constants/UserStatusEnum";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Manager from "../shared/models/Manager";


class ManagerLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            managerID: null,
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
                username: this.state.username,
                password: this.state.password
            });
            let response = await api.put("/managers/login", requestBody);
            // Get the returned manager and update a new object.
            const manager = new Manager(response.data);

            localStorage.setItem("token", manager.token);
            localStorage.setItem("ManagerID", manager.managerID);

            const requestBodyStatus = JSON.stringify(({
                userStatus: UserStatusEnum.ONLINE,
                token: localStorage.getItem("token")
            }));
            console.log(UserStatusEnum.ONLINE);
            await api.put(`/managers/${localStorage.getItem("ManagerID")}`, requestBodyStatus);

            const {managerID} = manager;
            this.props.history.push(`/manager/menu/${managerID}`);

        }catch(error) {
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
            <Container className= "custom-container2">
                <Row>
                    <Col>
                        <h1 style={{textAlign: "center",color: "#2F80ED", marginTop: '200px'}}>TipTopTournament</h1>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="auto" />
                    <Col xs={12} sm={12} md={8}>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
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
                                </Form>
                        <Row>
                            <Col/>
                            <Col>
                                <Button
                                    style={{marginTop:"30px"}}
                                    type="button"
                                    disabled={!this.state.username || !this.state.password}
                                    width="100%"
                                    onClick={() => {
                                        this.login();
                                    }}
                                >
                                    Als Manager einloggen
                                </Button>
                                <Button
                                    style={{marginTop:"15px"}}
                                    type="button"
                                    width="100%"
                                    onClick={() => {
                                        this.props.history.goBack();
                                    }}
                                >
                                    Back
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

export default withRouter(ManagerLogin);

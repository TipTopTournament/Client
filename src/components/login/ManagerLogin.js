import React from "react";
import { api, handleError } from "../../helpers/api";
import {withRouter} from "react-router-dom";
import { Button } from "../../views/design/Button";
import UserStatusEnum from "../shared/UserStatusEnum";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Manager from "../shared/models/Manager";
import Header from "../../views/Header";


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
                                    {this.formControl("Username", "username", "", "Username")}
                                    {this.formControl("Password", "password", "password", "Password")}
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
                                    Login
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

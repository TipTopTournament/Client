import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import {InputField} from "../../views/design/InputField";
import {Title} from "../../views/design/Title";
import {Label} from "../../views/design/Label";
import {ButtonContainer} from "../../views/design/ButtonContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
class Registration extends React.Component {

    constructor() {
        super();
        this.state = {
            fullName: null,
            username: null,
            password: null,
            is_manager: false
        };
    }
    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end
     * and its token is stored in the localStorage.
     */
    async register() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                fullName: this.state.fullName,
                password: this.state.password,
            });


            if (this.state.is_manager){
                await api.post('/managers', requestBody);
            }else{
                await api.post('/participants', requestBody);
            }


            // Register successfully worked --> navigate to the route /login in the TournamentRouter
            this.props.history.push(`/login`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    handleCheckClick = () => {
        this.setState({ is_manager: !this.state.is_manager});
        console.log(this.state.is_manager);
    }

    componentDidMount() {}

    render() {
        return (
            <Container>
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
                        <Form  style={{ align:"center"}}>
                            <Form.Group>
                                <Label>Fullname</Label>
                                    <InputField
                                        placeholder="Enter here.."
                                        onChange={e => {
                                            this.handleInputChange('fullName', e.target.value);
                                        }}
                                    />
                        </Form.Group>
                        <Form.Group>
                        <Label>Username</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                        </Form.Group>
                        <Form.Group>
                        <Label>Password</Label>
                        <InputField
                            type = "password"
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('password', e.target.value);
                            }}
                        />
                        </Form.Group>
                        <Label>
                            Register as a manager:
                            <input
                            name="is_manager"
                            type="checkbox"
                            checked={this.state.is_manager}
                            onChange={this.handleCheckClick}
                            />
                        </Label>
                        <ButtonContainer>
                            <Button
                                disabled={!this.state.username || !this.state.fullName || !this.state.password}
                                width="50%"
                                onClick={() => {
                                    this.register();
                                }}
                            >
                                Register
                            </Button>
                            <Button width="50%"
                                    onClick={() => {
                                        this.props.history.goBack();
                                    }}>
                                Back
                            </Button>
                        </ButtonContainer>
                        </Form>
                    </Col>
                    <Col md="auto" />
                </Row>
            </Container>
        );
    }
}

export default withRouter(Registration);

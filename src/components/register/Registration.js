import React from 'react';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import {Form} from "../../views/design/Form";
import {InputField} from "../../views/design/InputField";
import {Title} from "../../views/design/Title";
import {FormContainer} from "../../views/design/FormContainer";
import {Label} from "../../views/design/Label";
import {ButtonContainer} from "../../views/design/ButtonContainer";

class Registration extends React.Component {

    constructor() {
        super();
        this.state = {
            fullName: null,
            username: null,
            password: null,

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
            await api.post('/managers', requestBody);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/login`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {}

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Title>TIPTIPTournament</Title>
                        <Label>FullName</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('fullName', e.target.value);
                            }}
                        />
                        <Label>Username</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                        <Label>Password</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('password', e.target.value);
                            }}
                        />
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
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(Registration);

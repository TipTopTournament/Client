import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import {Button} from '../../views/design/Button';

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1440px;
  height: 800px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: #F2F2F2;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: #2F80ED;
  }
  height: 35px;
  padding-left: 15px;
  margin-left: 400px;
  margin-right: 485px
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255);
  color: #2F80ED;
`;

const Label = styled.label`
  margin-left: 400px;
  color: #2F80ED;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  margin-left: 400px;
  color: #2F80ED;
  justify-content: center;
  margin-top: 20px;
`;


class TournamentCode extends React.Component {
    tmpCode = "";

    constructor() {
        super();
        this.state = {
            code: null,
        };
    }

    logout() {
        localStorage.removeItem('token');
        this.props.history.push('/home')
    }

    async join() {

            const {key} = this.state.code;
            const response = await api.get(`/tournaments/${key}`);
            /**TODO TournamentCode response */
            this.props.history.push(`/game`);
    }

    mask(letter) {
        if (this.tmpCode.length > 4) {
            this.tmpCode += letter.toString();
            this.tmpCode.toString().replace(/^(\d{4})(\d{4}).*/, '$1-$2');
            this.handleInputChange("code", this.tmpCode);
        }
        else

            this.tmpCode += letter.toString();
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

                        <Label>Tournament Code</Label>
                        <InputField
                            placeholder="Enter TournamentCode (e.g. 1234-4567)"
                            maxlength="9"
                            onChange={e => {this.mask(e);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                disabled={!this.state.code}
                                width="50%"
                                onClick={() => {
                                    this.join();
                                }}
                            >
                                Join
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.logout();
                                }}
                            >
                                Temporary Logout
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(TournamentCode);

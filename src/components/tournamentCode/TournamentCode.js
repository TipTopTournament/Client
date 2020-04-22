import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
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


    constructor() {
        super();
        this.state = {
            displayCode: '',
            code: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    participants(){
        this.props.history.push(`${this.state.code}/playerlists`);
    }

    logout() {
        localStorage.removeItem('token');
        this.props.history.push('/home');
    }

    join() {
        this.props.history.push(`/tournaments/${this.state.code}`);
    }

    mask(e) {

        let tmpCode = "";
        tmpCode += e.target.value.toString();

        if (this.checkInputOnlyDigits(tmpCode)){

            if (tmpCode.length < 4) {
                return tmpCode;
            }

            switch (tmpCode.length) {
                case 4:
                    return tmpCode.replace(/^(\d{4}).*/, '$1-');
                case 5:
                    return tmpCode.replace(/^(\d{4})(\d).*/, '$1-$2');
                case 6:
                    return tmpCode.replace(/^(\d{4})(\d{2}).*/, '$1-$2');
                case 7:
                    return tmpCode.replace(/^(\d{4})(\d{3}).*/, '$1-$2');
                case 8:
                    return tmpCode.replace(/^(\d{4})(\d{4}).*/, '$1-$2');
                case 9:
                    return tmpCode.replace(/^(\d{4})(\d{4}).*/, '$1-$2');
                default:
                    alert("The tournament code must be 8 digits!");
                    return tmpCode.substring(0, tmpCode.length - 1);
            }
        }
        else {
        return tmpCode = '';
        }
    }

    checkInputOnlyDigits(input){
        let digits = new RegExp('^[0-9]+$');
        if (digits.test(input) || input.includes("-")) {
            return true;
        }
        else {
            alert("The tournament code can only contain digits");
            return false;
        }
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
        // Also sets the original code with dash
        if (value !== ""){
            this.setState( {code: value.replace('-','') || ''})
        }

    }



    componentDidMount() {
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Label>Tournament Code</Label>
                        <InputField
                            placeholder="Enter TournamentCode (e.g. 1234-4567)"
                            maxlength="10"
                            value = {this.state.displayCode || '' }
                            onChange={e => {this.handleInputChange('displayCode', this.mask(e));}}
                        />
                        <ButtonContainer>
                            <Button
                                disabled={!this.state.displayCode}
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
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.profiles();
                                }}
                            >
                                Profiles
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

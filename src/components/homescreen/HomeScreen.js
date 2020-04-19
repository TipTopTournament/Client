import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {ButtonWhite} from "../../views/design/ButtonWhite";


/** These four components are HomeScreen specific not necessary to make View class for it*/

const BaseContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
  max-width: auto;
  max-height: auto;
  flex-direction: column;
  color: #2F80ED;
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
  background: #2F80ED;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Title = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 144px;
line-height: 169px;
margin-left: auto;
margin-right: auto;
color:  #FFFFFF;
`;

class HomeScreen extends React.Component{
    async goLogin() {
    this.props.history.push(`/login`)
    }
    goRegister() {
    this.props.history.push('/register')
    }

    render(){
        return (
                <BaseContainer>
                    <Form>
                        <Title>TIPTOPTournament</Title>
                        <ButtonContainer>
                            <ButtonWhite
                                width="50%"
                                onClick={() => {
                                    this.goLogin();
                                }}
                            >
                                Login
                            </ButtonWhite>
                        <ButtonWhite
                            width="50%"
                            onClick={() => {
                                this.goRegister();
                            }}
                        >
                           Registration
                        </ButtonWhite>
                    </ButtonContainer>
                    </Form>
                </BaseContainer>
        );
    }
}
export default withRouter(HomeScreen);
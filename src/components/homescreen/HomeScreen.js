import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {Button} from "../../views/design/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {Title} from "../../views/design/Title";
/** These four components are HomeScreen specific not necessary to make View class for it*/


class HomeScreen extends React.Component{
    goLogin() {
    this.props.history.push(`/login`)
    }
    goRegister() {
    this.props.history.push('/register')
    }

    render(){
        return (
                <Container>
                    <p className="text-center">
                        <Row>
                            <Col>
                                <Title>TIPTOPTournament</Title>
                            </Col>
                        </Row>
                    </p>
                        <Row className="align-self-center">
                             <Col xs={12} sm={12}>
                                <Form>
                                     <Button
                                        type="button"
                                        width="50%"
                                        onClick={() => {
                                            this.goLogin();
                                        }}
                                     >Login
                                    </Button>
                                    <Button
                                        type="button"
                                        width="50%"
                                        onClick={() => {
                                            this.goRegister();
                                        }}
                                    >Register
                                    </Button>
                                </Form>
                             </Col>
                        </Row>
                </Container>
        );
    }
}
export default withRouter(HomeScreen);
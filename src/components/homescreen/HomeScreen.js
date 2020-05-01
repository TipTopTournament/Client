import React from "react";
import {withRouter} from "react-router-dom";
import {Button} from "../../views/design/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {Title} from "../../views/design/Title";


class HomeScreen extends React.Component{
    
    goLogin() {
    this.props.history.push(`/login`)
    }
    goRegister() {
    this.props.history.push('/register')
    }

    render(){
        return (
                <Container className= "custom-container2">
                        <Row>
                            <Col />
                            <Col>
                                <Title style={{marginTop: '200px'}}>TIPTOPTournament</Title>
                            </Col>
                            <Col />
                        </Row>
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
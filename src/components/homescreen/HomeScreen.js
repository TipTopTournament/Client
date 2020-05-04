import React from "react";
import {withRouter} from "react-router-dom";
import {Button} from "../../views/design/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {Title} from "../../views/design/Title";
import {TipTopTournamentLogo} from "../../views/design/TipTopTournamentLogo";


class HomeScreen extends React.Component{
    
    goLogin() {
    this.props.history.push(`/login`)
    }
    goRegister() {
    this.props.history.push('/register')
    }
    componentDidMount() {
        localStorage.removeItem("token");
    }
    render(){
        return (
                <Container className= "custom-container2">
                        <Row>
                            <Col>
                                <TipTopTournamentLogo style={{marginTop:"50px"}}/>
                                <h4 className="custom1" style={{color: "#2F80ED", marginLeft:"50px"}}>TIPTOPTournament</h4>
                            </Col>
                            <Col>
                                <Title   style={{marginTop: '250px'}}>TIPTOPTournament</Title>
                                <Col>
                                    <Row>
                                        <p style={{color:"#2F80ED", marginLeft:'80px'}}>"Easy organisation of your table tennis tournament"</p>
                                    </Row>
                                </Col>
                            </Col>
                            <Col />
                        </Row>
                        <Row className="align-self-center">
                             <Col xs={12} sm={12}>
                                <Form>
                                     <Button
                                        style={{marginTop: '50px'}}
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
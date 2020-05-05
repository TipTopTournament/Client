import React from "react";
import {withRouter} from "react-router-dom";
import {Button} from "../../views/design/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Title} from "../../views/design/Title";
import {TipTopTournamentLogo} from "../../views/design/TipTopTournamentLogo";


class HomeScreen extends React.Component{


    goLogin(id) {
        if (id ==="manager"){
            this.props.history.push(`/login/manager`)
        }else {
            this.props.history.push(`/login/participant`)
        }
    }
    goRegister() {
    this.props.history.push('/register')
    }
    componentDidMount() {
        localStorage.removeItem("token");
        localStorage.removeItem("ParticipantID");
        localStorage.removeItem("ManagerID");
        localStorage.removeItem("TournamentCode");
        localStorage.removeItem("address");
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
                             <Col>
                                 <Button
                                     style={{marginTop: '100px'}}
                                     type="button"
                                     width="50%"
                                     onClick={() => {
                                         this.goLogin("participant");
                                     }}
                                 >Login as Participant
                                 </Button>
                                 <Button
                                     style={{marginTop: '100px'}}
                                     type="button"
                                     width="50%"
                                     onClick={() => {
                                         this.goLogin("manager");
                                     }}
                                 >Login as Manager
                                 </Button>
                             </Col>
                            <Col/>
                            <Col>
                                <p style={{color: "#2F80ED", marginTop:'60px', marginLeft:'40px'}}>Not registered yet?</p>
                                <Button

                                type="button"
                                width="50%"
                                onClick={() => {
                                    this.goRegister();
                                }}
                            >Register
                            </Button>
                            </Col>
                        </Row>
                </Container>
        );
    }
}
export default withRouter(HomeScreen);
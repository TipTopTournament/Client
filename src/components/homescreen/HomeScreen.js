import React from "react";
import {withRouter} from "react-router-dom";
import {Button} from "../../views/design/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {TipTopTournamentLogo} from "../../views/design/TipTopTournamentLogo";
import {Title} from "../../views/design/Title";


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
    goInfo(){
        this.props.history.push('/info')
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
                            <Col xs={12} md={4} className= "col-info-background">
                                <TipTopTournamentLogo style={{marginTop:"300px"}}/>
                                <h4 className="custom1" style={{color: "#2F80ED",textAlign: "center"}}>TIPTOPTournament</h4>
                                <Button
                                    style={{display: "block", margin: "auto"}}
                                    width="50%"
                                    variant="info"
                                    onClick={() => {
                                        this.goInfo();
                                    }}
                                >Info
                                </Button>
                            </Col>
                            <Col xs={12} md={8}>
                                <p className="text-center">
                                <TipTopTournamentLogo style={{width:"40%", marginTop:"95px"}}/>
                                <Title   style={{margin:"auto"}}>TIPTOPTournament</Title>
                                <p style={{color:"#2F80ED",  margin: "auto", textAlign: "center", marginBottom: "150px"}}>"Easy organisation of your table tennis tournament"</p>
                                </p>
                                <div style={{display:"flex"}}>
                                    <Button
                                        style={{margin:"auto"}}
                                        type="button"
                                        width="45%"
                                        onClick={() => {
                                            this.goLogin("participant");
                                        }}
                                    >Login as Participant
                                    </Button>
                                    <Button
                                        style={{margin: "auto"}}
                                        type="button"
                                        width="45%"
                                        onClick={() => {
                                            this.goLogin("manager");
                                        }}
                                    >Login as Manager
                                    </Button>
                                </div>
                                    <p style={{color: "#2F80ED",  marginTop: "100px", textAlign: "center"}}>Not registered yet?</p>
                                    <Button
                                        style={{margin: "auto", display: "block"}}
                                        type="button"
                                        width="40%"
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
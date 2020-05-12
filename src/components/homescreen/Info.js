import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {TipTopTournamentLogo} from "../../views/design/TipTopTournamentLogo";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";

class Info extends React.Component{

render(){
    return (
        <Container className= "custom-container2">
            <Row>
                <Col>
                    <TipTopTournamentLogo style={{marginTop:"50px"}}/>
                    <h4 className="custom1" style={{color: "#2F80ED", marginLeft:"50px"}}>TIPTOPTournament</h4>
                </Col>
                <Col sm={8}>
                    <h1 style={{marginTop:"110px", color:"#2F80ED"}}> TIPTOPTournament FAQ</h1>
                    <h5 style={{marginTop:"20px"}}> What is TipTopTournament?</h5>
                    <h6 style={{color:"#2F80ED"}}> TIPTOPTournament is an organisation tool for real-time table tennis tournaments.</h6>
                    <h5> What is a licensenumber? And why do I need one?</h5>
                    <h6 style={{color:"#2F80ED"}}> We use license numbers as a result of working together with Swiss Table Tennis.
                        They require all registered players to have a license. So if you are already licensed by them,
                        you can just sign up for an account and login with your license number and your stats will already be available.
                        Our idea was that you could simply play your tournament through our application and we would send the results to Swiss Table Tennis.
                    </h6>
                    <h5> Will my scores be sent directly to Swiss Table Tennis?</h5>
                    <h6 style={{color:"#2F80ED"}}>  Sadly this idea is out of scope,
                        for the reason that we are only working with data exports and not with the data directly.
                        That's why we cannot send the results of the tournament to them yet,
                        but in case this might change later we insist on using the license numbers.
                    </h6>
                    <h5> What is a manager?</h5>
                    <h6 style={{color:"#2F80ED"}}>
                        A manager is an organizer of a tournament, he can setup a tournament and invite participants to join the tournament via a unique tournament-code.
                    </h6>
                    <h5> What is a participant?</h5>
                    <h6 style={{color:"#2F80ED"}}>  A participant is a player that joins a tournament and plays against others to come out on top and win the tournament!</h6>
                    <Button
                        style={{marginTop:"50px"}}
                        type="button"
                        width="50%"
                        onClick={() => {
                            this.props.history.goBack();
                        }}
                    >Back
                    </Button>
                </Col>
            </Row>
        </Container>
        );
    }
}

export default withRouter(Info);

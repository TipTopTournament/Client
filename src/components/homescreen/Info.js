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
                <Col  className= "col-info-background">
                    <TipTopTournamentLogo style={{marginTop:"300px"}}/>
                    <h4 className="custom1" style={{color: "#2F80ED",textAlign: "center"}}>TIPTOPTournament</h4>
                        <Button
                            style={{display: "block", margin: "auto"}}
                            type="button"
                            width="50%"
                            onClick={() => {
                                this.props.history.goBack();
                            }}
                        >Back
                        </Button>
                </Col>
                <Col sm={8}>
                    <h1 style={{marginTop:"20px", color:"#2F80ED"}}> TIPTOPTournament FAQ</h1>
                    <h5 style={{marginTop:"20px"}}> What is TipTopTournament?</h5>
                    <h6 style={{color:"#2F80ED"}}> TIPTOPTournament is an organisation tool for real-time table tennis tournaments.</h6>
                    <h5> How to use this application?</h5>
                    <h6 style={{color:"#2F80ED"}}> There are two main parts to this application a manager who controls and overviews a table tennis tournament and participants who play against each other</h6>
                    <h5> What is a manager?</h5>
                    <h6 style={{color:"#2F80ED"}}> A manager is an organizer of a tournament and he can invite participants to join his tournament via a unique tournament-code
                        and he can setup a tournament according to these settings the application will then calculate a time plan for the organizer and a bracket for the players to compete </h6>
                        <ul style={{listStyleType:"circle"}}>
                        <li style={{cursor:"text"}}> Define the location via Google Maps</li>
                            <li style={{cursor:"text"}}> Select the Start time</li>
                            <li style={{cursor:"text"}}> Select the amount of available tables</li>
                            <li style={{cursor:"text"}}> Select the expected amount of players</li>
                            <li style={{cursor:"text"}}> How long each game and break in between should take</li>
                        </ul>
                    <h5> What is a participant?</h5>
                    <h6 style={{color:"#2F80ED"}}>  A participant is a player with a license number that joins a tournament and competes against others to come out on top and win the tournament!</h6>
                    <h5> What is a license number? And why do I need one?</h5>
                    <h6 style={{color:"#2F80ED"}}> We use license numbers as a result of wanting to work together with Swiss Table Tennis.
                        They require all registered players to have a license. So if you were already licensed by them,
                        you could just sign up for an account and login with your license number and your stats would be already available.
                        Our idea was that you could simply play your tournament through our application and we would send the results to Swiss Table Tennis.
                    </h6>
                    <h5> Will my scores be sent directly to Swiss Table Tennis?</h5>
                    <h6 style={{color:"#2F80ED"}}>  Sadly this idea is out of scope,
                        for the reason that we are only working with data exports and not with the data directly.
                        That's why we cannot send the results of the tournament to them yet,
                        but in case this might change later we insist on using the license numbers.
                    </h6>
                </Col>
            </Row>
        </Container>
        );
    }
}

export default withRouter(Info);

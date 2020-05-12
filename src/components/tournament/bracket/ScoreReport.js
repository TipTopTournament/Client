import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { api, handleError } from "../../../helpers/api";



class ScoreReport extends React.Component {
    constructor(){
        super();
        this.state = {
            tournamentCode: null,
            gameId: null,
            participant1: null,
            participant2: null,
            score1: null,
            score2: null,
            game: null,
            gameState: null,
            startTime: null,
        }
    }

    componentDidMount(){
        this.setGame( this.props.gameFromBracket);
    }

    setGame(game){
            this.setState({game: game});
            this.setState({gameId: game.gameId});
            this.setState({gameState: game.gameState});
            this.setState({participant1: game.participant1.vorname});
            this.setState({participant2: game.participant2.vorname});
            this.setState({score1: game.score1});
            this.setState({score2: game.score2});
            this.setState({startTime: game.startTime});
            this.setState({tournamentCode: game.tournamentCode});
    }


    handleEnterScore(key, value) {
        this.setState({ [key]: value });
      }

    displayName(name){
        if(!name){
            return "TBD"
        }else{
            return name;
        }
    }

    async submitScore(){
        console.log(this.state);
        try {
            const requestBody = JSON.stringify({
                score1: this.state.score1,
                score2: this.state.score2,
            });
                await api.put(`/tournaments/${this.state.tournamentCode}/bracket/report/${this.state.gameId}/${localStorage.getItem("ParticipantID")}`, requestBody);
                this.props.history.goBack(); // after submitting automatically redirect to bracket?
        }catch(error) {
            alert(`you have already entered the score: \n${handleError(error)}`);
        }

    }

    render() {
        if (!this.state.game) {
            return (
                <Container className= "custom-container2" >
                    <Row>
                        <Col />
                        <Col><h1>Your next game has not been determined yet</h1></Col>
                        <Col />
                    </Row>
                </Container>
            );
        }
        return (
            <Container>
                <Row>
                    <Col />
                    <Col>
                        {this.displayName(this.state.participant1)} vs {this.displayName(this.state.participant2)}
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Enter score of {this.displayName(this.state.participant1)}
                            </Form.Label>
                            <Form.Control
                                placeholder="1-3"
                                onChange={e => {
                                    this.handleEnterScore("score1", e.target.value);
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>

                                Enter score of {this.displayName(this.state.participant2)}
                            </Form.Label>
                            <Form.Control
                                placeholder="1-3"
                                onChange={e => {
                                    this.handleEnterScore("score2", e.target.value);
                                }} />
                        </Form.Group>
                    </Form>
                    <Button
                        style={{marginLeft:"135px", marginTop:"15px"}}
                        type="button"
                        disabled={!this.state.score1 || !this.state.score2}
                        onClick={() => {
                            this.submitScore();
                        }}>
                            Submit
                    </Button>
                    </Col>
                    <Col />
                </Row>
            </Container>
        );
    }
}

export default withRouter(ScoreReport);
import React from 'react';
import { api, handleError } from '../../../helpers/api';
import { Button } from '../../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Tree from "react-tree-graph";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../../../views/design/custom-container.css';
import {ButtonContainer} from "../../../views/design/ButtonContainer";
import ScoreReport from './ScoreReport';
import Game from "../../../views/Game";
import Form from 'react-bootstrap/Form'
import ListGroup from "react-bootstrap/ListGroup";
import Winner from "../../../views/design/Winner";
import Spinner from "react-bootstrap/Spinner";
import {TipTopTournamentLogo} from "../../../views/design/TipTopTournamentLogo";

class Bracket extends React.Component {
    constructor() {
        super();
        this.state = {
            games: null,
            data: {name: 'Finale', children: [{name: 'Halbfinale1',children:[{name: "Viertelfinale"}, {name:"Viertelfinale2"}]}, {name: 'Halbfinale2'}]},
            participantID: localStorage.getItem("ParticipantID"),
            myGame: null,
            manager: localStorage.getItem("ManagerID"),
            score1: null,
            score2: null,
            winner: null,
            rerender: false,
            tournament: {
                tournamentName: null,
                winner: null,
                tournamentState: null,
            }

        };
    }
    intervalID;
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });}

    getGameOfParticipant(){
        let myGame = null;
        const GameAlreadyPlayed = "FINISHED";
        this.state.games.map(game => {
            let PlayerID1 = parseInt(game.participant1.participantID);
            let PlayerID2 = parseInt(game.participant2.participantID);
            let MyID = parseInt(this.state.participantID);
            let GameState = game.gameState;

            if ((PlayerID1 === MyID && GameState !== GameAlreadyPlayed) ||
                (PlayerID2 === MyID && GameState !== GameAlreadyPlayed)){
                myGame = game;
            }
        });
        return myGame;
    }

    setupSingleGame(Game){
        return  {name: Game['participant1'].vorname + " " + Game.score1 + " vs. " + Game.score2 + " " + Game['participant2'].vorname}
    }
    setup3Games(Game,Child1,Child2) {
        return {name: Game['participant1'].vorname + " " + Game.score1 + " vs. " + Game.score2 + " " + Game['participant2'].vorname,
                children:[{
                        name: Child1['participant1'].vorname + " " + Child1.score1 + " vs. " + Child1.score2 + " " + Child1['participant2'].vorname
                }, {
                        name: Child2['participant1'].vorname + " " + Child2.score1 + " vs. " + Child2.score2 + " " + Child2['participant2'].vorname}]}
    }
    mergeSubtree(Parent, LftChild,RgtChild){
        return {name: Parent['participant1'].vorname + " " + Parent.score1 + " vs. " + Parent.score2 + " " + Parent['participant2'].vorname,
            children:[LftChild,RgtChild]}
    }

    setupBracket(Games){
        switch (Games.length) {
            case 1:
                let setup0 = this.setupSingleGame(Games['0']);
                this.setState({data: setup0});
                break;

            case 3:
                let setup1 = this.setup3Games(Games["2"],Games["0"], Games["1"]);
                this.setState({data: setup1});
                break;

            case 7:
                let lftChild = this.setup3Games(Games["4"],Games["0"], Games["1"]);
                let rgtChild = this.setup3Games(Games["5"],Games["2"], Games["3"]);
                let setup2 = this.mergeSubtree(Games["6"],lftChild,rgtChild);
                this.setState({data: setup2});
                break;

            case 15:
                let lftChild1 = this.setup3Games(Games["8"],Games["0"], Games["1"]);
                let rgtChild1 = this.setup3Games(Games["9"],Games["2"], Games["3"]);
                let lftChild2 = this.setup3Games(Games["10"],Games["4"], Games["5"]);
                let rgtChild2 = this.setup3Games(Games["11"],Games["6"], Games["7"]);
                let lftChild3 = this.mergeSubtree(Games["12"], lftChild1, rgtChild1);
                let rgtChild3 = this.mergeSubtree(Games["13"], lftChild2, rgtChild2);
                let setup3 = this.mergeSubtree(Games["14"], lftChild3, rgtChild3);
                this.setState({data: setup3});
                break;

            default:
                break;
        }
    }

    correctArray(response){
        response.map(game => {


            if(!game["participant1"]){
                game["participant1"] = "Not yet determined!"
            }
            if(!game["participant2"]){
                game["participant2"] = "Not yet determined!"
            }

        });

    }

    checkScores(gameData) {
        if (gameData.participant1 || gameData.participant2) {
            if (this.state.score1 === null || this.state.score2 === null) {
                return false;
            }
            return this.state.score1 !== this.state.score2;
        } else {
            return false;
        }
    }

    async changeScore(gameId,tournamentCode){

        try {
            const requestBody = JSON.stringify({
                score1: this.state.score1,
                score2: this.state.score2,
            });
            await api.put(`/tournaments/${tournamentCode}/bracket/${gameId}/${this.state.manager}`, requestBody);
            alert("Successfully updated score ");
            window.location.reload();
        } catch (error) {
            alert(`Something went wrong during changing the score     : \n${handleError(error)}`);
        }
    }

    async getData() {
        try {
            const {tournamentCode} = this.props.match.params;
            new Promise(resolve => setTimeout(resolve, 1500));
            const responseTournament = await api.get(`/tournaments/${tournamentCode}`);
            this.setState({tournament : responseTournament.data});
            const response = await api.get(`/tournaments/${tournamentCode}/bracket`);
            this.correctArray(response.data);
            this.setState({ games : response.data });
            this.setupBracket(response.data);
            this.intervalID = setTimeout(this.getData.bind(this), 5000);
        } catch (error) {
            alert(`Something went wrong while fetching the bracket: \n${handleError(error)}`);
        }
    }

    componentDidMount() {
        this.getData();

    }
    componentWillUnmount() {
        /*
         --> unmounting this component
         so it does not interfere with other components
        */
        clearTimeout(this.intervalID);
    }

    render() {
        return (
            <Container className= "custom-container2">
                {!this.state.games ? (
                    <Row>
                        <Col/>
                        <Col>
                             <h4 style={{marginTop:"350px", marginLeft:"25px", color:"#2F80ED"}}>Your tournament is being loaded </h4>
                            <Spinner style={{marginTop:"30px", marginLeft:"180px"}} animation="border" variant="primary" />
                        </Col>
                        <Col />
                    </Row>
                ) : (
                <Row>
                    <Col/>
                    <Col>
                        <div className = "custom-container">
                            <TipTopTournamentLogo style={{display: "block",margin:"auto", marginTop:"15px", preserveAspectRatio: "xMinYMin slice", height: "60%", width: "60%"}}/>
                            <h2 className="custom1" style={{color: "#2F80ED", textAlign: "center"}}>{this.state.tournament.tournamentName} - {this.state.tournament.tournamentState}</h2>
                            <Tree
                                data={this.state.data}
                                height={500}
                                width={400}
                                svgProps={{
                                    className: 'custom',
                                }}/>
                        </div>
                    </Col>
                    <Col/>
                </Row>
                )}
                {!this.state.games ? (
                    <Row>
                        <Col>
                        </Col>
                    </Row>
                ) : (
                <Row>
                    <Col>
                        {!this.state.tournament.winner ? (
                            !this.state.manager ? (
                            <ScoreReport gameFromBracket={this.getGameOfParticipant()}/>
                        ) : (
                            <ListGroup variant="flush">
                                {this.state.games.map(gameData => {
                                    return (
                                        <ListGroup.Item style={{background:  "#F3F3FF",   display: "flex", alignItems: "center", justifyContent: "center"}} key={gameData.gameId}
                                        >
                                            <Game gameData={gameData} />
                                            <Form style={{marginLeft:"30px"}}>
                                                <Form.Group controlId="ControlInput1">
                                                    <Form.Label>{gameData.participant1.vorname + "'s score"}</Form.Label>
                                                    <Form.Control type="TournamentName" placeholder={gameData.participant1.vorname} onChange={e => {this.handleInputChange("score1", e.target.value);}}/>
                                                </Form.Group>
                                                <Form.Group controlId="ControlInput1">
                                                    <Form.Label>{gameData.participant2.vorname + "'s score"}</Form.Label>
                                                    <Form.Control type="TournamentName" placeholder={gameData.participant2.vorname} onChange={e => {this.handleInputChange("score2", e.target.value);}}/>
                                                </Form.Group>
                                            </Form>
                                            <Button
                                                disabled={!this.checkScores(gameData) || !(this.state.tournament.tournamentState == "ACTIVE")}
                                                style={{marginLeft:"50px"}}
                                                type="button"
                                                width="auto"
                                                onClick={() => {
                                                    this.changeScore(gameData.gameId,gameData.tournamentCode)
                                                }}
                                            >{"Edit Game of " + gameData["participant1"].vorname + " vs. " +  gameData["participant2"].vorname}
                                            </Button>
                                        </ListGroup.Item>
                                    )})}
                            </ListGroup>
                        )):(
                            <Winner winnerFromBracket ={this.state.tournament.winner}/>
                        )}
                    </Col>
                </Row>
                )}
                <Row>
                    <Col/>
                    <Col>
                        <ButtonContainer>
                            <Button
                                style={{marginTop: "15px", marginBottom: "25px"}}
                                width="100%"
                                onClick={() => {
                                    this.props.history.goBack();
                                }}
                            >
                                Back to Tournament Overview
                            </Button>
                        </ButtonContainer>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Bracket);
import React from 'react';
import { api, handleError } from '../../../helpers/api';
import { NoData } from '../../../views/design/NoData';
import { Button } from '../../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {TipTopTournamentLogo} from "../../../views/design/TipTopTournamentLogo";

class LeaderBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            leaderBoardUsers: null,
            tournament: {
                tournamentName: null,
                tournamentState: null,
            }
        };
    }
    counter = 0;
    handleClick(playerID){
        const {tournamentCode} = this.props.match.params;
        this.props.history.push (`/${tournamentCode}/participants/${playerID}`)
    }

    goBack(){
        const {tournamentCode} = this.props.match.params;
        if(localStorage.getItem("ParticipantID")){
            this.props.history.push(`/${tournamentCode}/participantMenu`)
        }else{
            this.props.history.push(`/manager/tournaments/${tournamentCode}`)
        }
    }

    renderLeaderBoard(leaderBoardUser) {
        this.counter ++;
        return (
            <tr key={leaderBoardUser["participant"].participantID} onClick={() => this.handleClick(leaderBoardUser["participant"].participantID)}>
                <td>{this.counter}</td>
                <td>{leaderBoardUser["participant"].vorname}</td>
                <td>{leaderBoardUser["participant"].nachname}</td>
                <td>{leaderBoardUser.wins}</td>
                <td>{leaderBoardUser.losses}</td>
                <td>{leaderBoardUser.pointsConceded}</td>
                <td>{leaderBoardUser.pointsScored}</td>
            </tr>
        );
    }


    async componentDidMount() {
        try {
            const {tournamentCode} = this.props.match.params;
            const response = await api.get(`/tournaments/${tournamentCode}/leaderboard`);
            console.log("response", response.data);
            this.counter = 0;
            this.setState({ leaderBoardUsers: response.data });
            const responseTournament = await api.get(`/tournaments/${tournamentCode}`);
            this.setState({tournament : responseTournament.data});

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <Container className= "custom-container2">
                <Row>
                    <Col/>
                    <Col>
                {!this.state.leaderBoardUsers || ! this.state.tournament ? (
                    <NoData />
                ) : (
                    <div>
                        <TipTopTournamentLogo style={{display: "block",margin:"auto", marginTop:"15px", preserveAspectRatio: "xMinYMin slice", height: "50%", width: "50%"}}/>
                        <h2 className="custom1" style={{color: "#2F80ED", textAlign: "center"}}>{this.state.tournament.tournamentName} - {this.state.tournament.tournamentState}</h2>
                        <Table responsive="sm" style={{marginTop: "15px"}}>
                            <thead>
                            <tr>
                                <th>Rank</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Sets conceded</th>
                                <th>Sets scored</th>
                            </tr>
                            </thead>
                                <tbody>
                                {this.state.leaderBoardUsers.map(leaderBoardUser => {
                                    return (
                                        this.renderLeaderBoard(leaderBoardUser)
                                    );
                                })}
                                </tbody>
                        </Table>
                        <Button
                            style={{marginTop: "25px"}}
                            width="100%"
                            onClick={() => {
                                this.goBack();
                            }}
                        >
                            Back to Tournament Overview
                        </Button>
                    </div>
                )}
                    </Col>
                    <Col/>
                </Row>
            </Container>
        );
    }
}

export default withRouter(LeaderBoard);
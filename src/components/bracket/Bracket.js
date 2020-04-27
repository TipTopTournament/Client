import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { NoData } from '../../views/design/NoData';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Game from "../../views/Game";
import Tree from "react-tree-graph";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {forEach} from "react-bootstrap/cjs/ElementChildren";


const TournamentBracket = styled.ul`
  margin-bottom: 50px;
  list-style: none;
  padding-left: 0;
  border: 1px solid;
`;

const BracketContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const data = {name: 'Finale', children: [{name: 'Halbfinale1'}, {name: 'Halbfinale2'}]};

class Bracket extends React.Component {
    constructor() {
        super();
        this.state = {
            games: null,
        };
    }

    inspectGame(game){
        const {tournamentCode} = this.props.match.params;
        this.props.history.push(`/tournaments/${tournamentCode}/bracket/${game}`)
    }
    
    async componentDidMount() {
        try {
            const {tournamentCode} = this.props.match.params;
            const response = await api.get(`/tournaments/${tournamentCode}/bracket`);
            console.log("response", response.data);
            this.correctArray(response.data);
            this.setState({ games : response.data });

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }
    correctArray(response){
        const test = response.map(game => {


            if(!game["participant1"]){
                game["participant1"] = "Not yet determined!"
            }
            if(!game["participant2"]){
                game["participant2"] = "Not yet determined!"
            }

            console.log(game["participant1"]["vorname"]);
            console.log(game["participant2"]["vorname"]);
        });

    }

    render() {
        return (
            <Container>
                {!this.state.games ? (
                    <NoData />
                ) : (
                <Row>
                    <Col>
                        <Tree
                            data={data}
                            height={200}
                            width={400}/>
                        <TournamentBracket>
                            {this.state.games.map(game => {
                                return (
                                    <BracketContainer key={game.gameId} onClick={()=> this.inspectGame(game.gameId)}>
                                        <Game gameData={game} />
                                    </BracketContainer>
                                );
                            })}
                        </TournamentBracket>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.props.history.goBack();
                            }}
                        >
                            Back to Tournament Overview
                        </Button>
                    </Col>
                </Row>
                )}
            </Container>
        );
    }
}

export default withRouter(Bracket);
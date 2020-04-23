import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { NoData } from '../../views/design/NoData';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Game from "../../views/Game";
import Tree from "react-tree-graph";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const TournamentBracket = styled.ul`
  margin-bottom: 50px;
  list-style: none;
  padding-left: 0;
  border: 1px solid;
`;

const BracketContainer = styled.li`
  display: flex;
  margin: 10 px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const data = {name: 'Finale', children: [{name: 'Halbfinale'}, {name: 'Halbfinale'}]};

class Bracket extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            games: null
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

            this.setState({ games: response.data });

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <Container>
                {!this.state.games ? (
                    <NoData />
                ) : (
                    <div>
                        <Tree
                            data={data}
                            height={200}
                            width={400}/>
                        <TournamentBracket>
                            {this.state.games.map(game => {
                                return (
                                    <BracketContainer key={game.gameId} onClick={()=> this.inspectGame(game.gameId)}>
                                        <Game game={game} />
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
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(Bracket);
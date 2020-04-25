import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { withRouter } from 'react-router-dom';
import { NoData } from "../../views/design/NoData";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import SingleTournament from "../../views/SingleTournament";
import {Button} from "../../views/design/Button";

const TournamentContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ButtonPlayerList = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
  display: block
  justifyContent: 'space-between'
`;

class ManagerMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            tournaments: null,
        };
    }

    handleClick(tournamentCode){
        this.props.history.push(`/tournaments/${tournamentCode}/`);
    }

    async componentDidMount() {
        try {
            const {managerID} = this.props.match.params;
            const response = await api.get("/tournaments/9xU1GIV3"); //TODO Temporary request until this one is provided by backend`/managers/${managerID}/tournaments`
            // ARRAY LIST IS NECESSARY SO IT CAN BE MAPPED

            console.log("response", response.data);
            // Get the returned users and update the state.
            this.setState({ tournaments: response.data });

            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1 style={{ textAlign: "center" }}>TipTopTournament</h1>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="auto" />
                    <Col xs={12} sm={12} md={8}>
                {!this.state.tournaments ? (
                    <NoData />

                ) : (

                        <Form>
                            <Form.Group>
                                <h3>Tournamentlist</h3>

                                {this.state.tournaments.map(tournament => {
                                    return (
                                        <TournamentContainer key={tournament.tournamentId}
                                                             // onClick={() => this.handleClick()}
                                        >
                                            <SingleTournament tournament={tournament} />
                                        </TournamentContainer>
                                    );
                                })}
                                <Button
                                    width="100%"
                                    onClick={() => {
                                        this.props.history.goBack();  localStorage.removeItem('token');
                                    }}
                                >
                                    Leave tournament
                                </Button>
                            </Form.Group>
                            </Form>
                )}
                    </Col>
                    <Col md="auto" />
                </Row>
            </Container>
        );
    }
}

export default withRouter(ManagerMenu);

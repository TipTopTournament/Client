import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
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

const Tournaments = styled.ul`
  list-style: none;
  padding-left: 0;

`;
class ManagerMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            tournaments: null,
        };
    }

    logout(){
        localStorage.removeItem('token');
        this.props.history.push("/login");
    }

    handleClick(tournamentCode){
        this.props.history.push(`/tournaments/${tournamentCode}/`);
    }

    async componentDidMount() {
        try {

            const managerID = this.props.match.params.managerID;
            const response = await api.get(`/managers/${managerID}/tournaments`);
            console.log("response_raw", response);
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
                                <Tournaments>
                                {this.state.tournaments.map(tournamentData => {
                                    return (
                                        <TournamentContainer key={tournamentData.tournamentId}
                                                             onClick={() => this.handleClick(tournamentData.tournamentCode)}>
                                        <SingleTournament tournamentData={tournamentData} />
                                        </TournamentContainer>
                                    );
                                })}
                                </Tournaments>
                                <Button
                                    width="100%"
                                    onClick={() => {
                                        this.logout();
                                    }}
                                >
                                    Logout
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

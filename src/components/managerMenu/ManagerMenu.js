import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import Container from "react-bootstrap/Container";
import UserStatusEnum from "../shared/UserStatusEnum";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import SingleTournament from "../../views/SingleTournament";
import {Button} from "../../views/design/Button";
import {ButtonContainer} from "../../views/design/ButtonContainer";

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
        try{
            const requestBodyStatus = JSON.stringify(({
                userStatus: UserStatusEnum.OFFLINE,
                token: localStorage.getItem("token")
            }));
            api.put(`/managers/${localStorage.getItem("ManagerID")}`, requestBodyStatus);

            localStorage.removeItem('token');
            localStorage.removeItem('ManagerID');
            localStorage.removeItem('address');
            this.props.history.push("/home");
        }catch(error) {
            alert(`Something went wrong during the logout: \n${handleError(error)}`);
        }
    }

    handleClick(tournamentCode){
        this.props.history.push(`/tournaments/${tournamentCode}/`);
    }
    goToCreate(){
        this.props.history.push(`/manager/createTournament/${localStorage.getItem("ManagerID")}`);
        }


    async componentDidMount() {
        try {
            const managerID = this.props.match.params.managerID;
            const response = await api.get(`/managers/${managerID}/tournaments`);
            // Get the returned users and update the state.
            console.log(response.data);
            this.setState({ tournaments: response.data });

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <Container className= "custom-container2">
                <Row>
                    <Col>
                        <h1 style={{textAlign: "center",color: "#2F80ED", marginTop: '200px'}}>TipTopTournament</h1>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="auto" />
                    <Col xs={12} sm={12} md={8}>
                {!this.state.tournaments || this.state.tournaments.length === 0 ? (
                    <Form style={{marginTop: '50px'}}>
                        <Form.Group>
                            <h3>My Tournaments: </h3>
                            <h3 style={{marginTop: '50px'}}>Hey, it looks empty! What about creating a new tournament?</h3>
                            <p> If you created a tournament and it did not show up, try to refresh the page (F5) </p>
                            <ButtonContainer style={{marginTop: '100px'}}>
                                <Button
                                    width="100%"
                                    onClick={() => {
                                        this.goToCreate();
                                    }}
                                >
                                    Create a new tournament
                                </Button>
                            </ButtonContainer>
                            <ButtonContainer>
                                <Button
                                    width="100%"
                                    onClick={() => {
                                        this.logout();
                                    }}
                                >
                                    Logout
                                </Button>
                            </ButtonContainer>
                        </Form.Group>
                    </Form>

                ) : (

                        <Form>
                            <Form.Group>
                                <h3 style={{marginTop: '50px'}}>My Tournaments: </h3>
                                <p>If you created a tournament and it did not show up, try to refresh the page (F5) </p>
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
                                <ButtonContainer style={{marginTop: '100px'}}>
                                    <Button
                                        width="100%"
                                        onClick={() => {
                                            this.goToCreate();
                                        }}
                                    >
                                        Create a new tournament
                                    </Button>
                                </ButtonContainer>
                                <ButtonContainer>
                                <Button
                                    width="100%"
                                    onClick={() => {
                                        this.logout();
                                    }}
                                >
                                    Logout
                                </Button>
                                </ButtonContainer>
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

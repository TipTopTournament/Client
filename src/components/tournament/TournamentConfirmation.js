import Container from "react-bootstrap/Container";
import Header from "../../views/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import {api, handleError} from "../../helpers/api";


class TournamentConfirmation extends React.Component{
    constructor() {
        super();
        this.state = {
            tournamentCode: null,
        };
    }
    intervalID;

    async getTournamentCode(){
        try{
            const tournamentCode = localStorage.getItem("tournamentCode");
            if (!tournamentCode){
                this.intervalID = setTimeout(this.getTournamentCode.bind(this), 3000);
            } else {
                const responseTournament = await api.get(
                    `/tournaments/${tournamentCode}`
                );
                this.setState({ tournamentCode: responseTournament.data.tournamentCode });
            }
        } catch (error) {
        alert(
            `Something went wrong while fetching the tournament: \n${handleError(error)}`
        );
    }
}
    componentDidMount() {
        this.getTournamentCode();
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }
    render() {
    return (
        <Container className= "custom-container2">
                {!this.state.tournamentCode ? (
                    <Row className="justify-content-md-center">
                        <Col md="auto"/>
                        <Col xs={12} sm={12} md={8}>
                            <Header/>
                            <h2
                                style={{marginTop: "60px", color: "#2F80ED", textAlign: "center"}}>
                                Your tournament is being created{" "}
                            </h2>
                            <Spinner
                                style={{alignItems: "center", marginLeft: "410px",marginTop: "15px" }}
                                animation="border"
                                variant="primary"
                            />
                        </Col>
                        <Col md="auto"/>
                    </Row>
                ) : (
                    <Row className="justify-content-md-center">
                        <Col md="auto" />
                        <Col xs={12} sm={12} md={8}>
                            <Header/>
                            <h2 style={{color: "#2F80ED", marginTop:"50px"}}>
                                Your tournament has been created!
                            </h2>
                            <h3 style={{color: "#2F80ED"}}>
                                The tournament code for the participants to join is: {this.state.tournamentCode}
                            </h3>
                            <Button
                                style={{marginTop:"50px"}}
                                type="button"
                                width="100%"
                                onClick={() => {
                                this.props.history.push(`/manager/menu/${localStorage.getItem("ManagerID")}`);
                            }}
                            >Back to Menu
                            </Button>
                    </Col>
                    <Col md="auto" />
                </Row>
                )};
        </Container>
    )}

}

export default withRouter(TournamentConfirmation);
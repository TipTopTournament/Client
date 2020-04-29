import React from 'react';
import { api, handleError } from '../../helpers/api';
import { NoData } from '../../views/design/NoData';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Tree from "react-tree-graph";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../../views/design/custom-container.css';
import {ButtonContainer} from "../../views/design/ButtonContainer";
import ScoreReport from './ScoreReport';

class Bracket extends React.Component {
    constructor() {
        super();
        this.state = {
            games: null,
            data: {name: 'Finale', children: [{name: 'Halbfinale1',children:[{name: "Viertelfinale"}, {name:"Viertelfinale2"}]}, {name: 'Halbfinale2'}]},
        };
    }

    inspectGame(game){
        const {tournamentCode} = this.props.match.params;
        this.props.history.push(`/tournaments/${tournamentCode}/bracket/${game}`)
    }
    setupBracket(Games){
        console.log("length",Games.length);
        switch (Games.length) {
            case 3:
                let setup1 = {name: Games['2']['participant1'].vorname + " " + Games['2'].score1 + " vs. " + Games['2'].score2 + " " + Games['2']['participant2'].vorname,
                    children: [{name: Games['0']['participant1'].vorname + " " + Games['0'].score1 + " vs. " + Games['0'].score2 + " " + Games['0']['participant2'].vorname},
                        {name: Games['1']['participant1'].vorname + " " + Games['1'].score1 + " vs. " + Games['1'].score2 + " " + Games['1']['participant2'].vorname}]};
                this.setState({data: setup1});
                console.log("data", this.state.data);
                break;
            case 7:
                let setup2 = {name: Games['6']['participant1'].vorname + " " + Games['6'].score1 + " vs. " + Games['6'].score2 + " " + Games['6']['participant2'].vorname,
                                    children: [{name: Games['4']['participant1'].vorname + " " + Games['4'].score1 + " vs. " + Games['0'].score2 + " " + Games['4']['participant2'].vorname,
                                                      children: [{name: Games['0']['participant1'].vorname + " " + Games['0'].score1 + " vs. " + Games['0'].score2 + " " + Games['0']['participant2'].vorname},
                                                                 {name: Games['1']['participant1'].vorname + " " + Games['1'].score1 + " vs. " + Games['1'].score2 + " " + Games['1']['participant2'].vorname}]},
                                               {name: Games['5']['participant1'].vorname + " " + Games['5'].score1 + " vs. " + Games['5'].score2 + " " + Games['5']['participant2'].vorname,
                                                      children:[{name: Games['2']['participant1'].vorname + " " + Games['2'].score1 + " vs. " + Games['2'].score2 + " " + Games['2']['participant2'].vorname},
                                                                {name: Games['3']['participant1'].vorname + " " + Games['3'].score1 + " vs. " + Games['3'].score2 + " " + Games['3']['participant2'].vorname}]}]};
                this.setState({data: setup2});
                console.log("data", this.state.data);
                break;
            case 15:
                let setup3 = {name: Games['14']['participant1'].vorname + " " + Games['14'].score1 + " vs. " + Games['14'].score2 + " " + Games['14']['participant2'].vorname,
                                    children: [{name: Games['12']['participant1'].vorname + " " + Games['12'].score1 + " vs. " + Games['12'].score2 + " " + Games['12']['participant2'].vorname,
                                                      children: [{name: Games['8']['participant1'].vorname + " " + Games['8'].score1 + " vs. " + Games['8'].score2 + " " + Games['8']['participant2'].vorname,
                                                                        children:[{name: Games['0']['participant1'].vorname + " " + Games['0'].score1 + " vs. " + Games['0'].score2 + " " + Games['0']['participant2'].vorname},
                                                                                  {name: Games['1']['participant1'].vorname + " " + Games['1'].score1 + " vs. " + Games['1'].score2 + " " + Games['1']['participant2'].vorname}]},
                                                                 {name: Games['9']['participant1'].vorname + " " + Games['9'].score1 + " vs. " + Games['9'].score2 + " " + Games['9']['participant2'].vorname,
                                                                        children:[{name: Games['2']['participant1'].vorname + " " + Games['2'].score1 + " vs. " + Games['2'].score2 + " " + Games['2']['participant2'].vorname},
                                                                                  {name: Games['3']['participant1'].vorname + " " + Games['3'].score1 + " vs. " + Games['3'].score2 + " " + Games['3']['participant2'].vorname}]}]},
                                               {name: Games['13']['participant1'].vorname + " " + Games['13'].score1 + " vs. " + Games['13'].score2 + " " + Games['13']['participant2'].vorname,
                                                      children:[{name: Games['10']['participant1'].vorname + " " + Games['10'].score1 + " vs. " + Games['10'].score2 + " " + Games['10']['participant2'].vorname,
                                                                       children:[{name: Games['4']['participant1'].vorname + " " + Games['4'].score1 + " vs. " + Games['4'].score2 + " " + Games['4']['participant2'].vorname},
                                                                                 {name: Games['5']['participant1'].vorname + " " + Games['5'].score1 + " vs. " + Games['5'].score2 + " " + Games['5']['participant2'].vorname}]},
                                                                {name: Games['11']['participant1'].vorname + " " + Games['11'].score1 + " vs. " + Games['11'].score2 + " " + Games['11']['participant2'].vorname,
                                                                        children:[{name: Games['6']['participant1'].vorname + " " + Games['6'].score1 + " vs. " + Games['6'].score2 + " " + Games['6']['participant2'].vorname},
                                                                                  {name: Games['7']['participant1'].vorname + " " + Games['7'].score1 + " vs. " + Games['7'].score2 + " " + Games['7']['participant2'].vorname}]}]}]};
                this.setState({data: setup3});
                console.log("data", this.state.data);
                break;
            default:
                break;
        }
    }
    
    async componentDidMount() {
        try {
            const {tournamentCode} = this.props.match.params;
            const response = await api.get(`/tournaments/${tournamentCode}/bracket`);
            console.log("response", response.data);
            this.correctArray(response.data);
            this.setState({ games : response.data });
            this.setupBracket(response.data);
            // this.setState({data: {name: '', children: [{name: '',children: [{name: '',},{name: '',}]}, {name: '',children: [{name: '',},{name: '',}]}]}})


        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
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

    render() {
        return (
            <Container>
                {!this.state.games} ? (
                    <NoData />
                ) : (
                <Row>
                    <Col>
                        <div className = "custom-container">
                            <Tree
                                data={this.state.data}
                                height={600}
                                width={400}
                                svgProps={{
                                    className: 'custom',
                                }}/>
                            }}/>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col><ScoreReport /></Col>
                </Row>
                <Row>
                    <Col />
                    <Col>
                        <ButtonContainer>
                            <Button
                                width="100%"
                                onClick={() => {
                                    this.props.history.goBack();
                                }}
                            >
                                Back to Tournament Overview
                            </Button>
                        </ButtonContainer>
                    </Col>
                    <Col />
                </Row>
                )}
            </Container>
        );
    }
}

export default withRouter(Bracket);
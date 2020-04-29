import React from "react";
import { withRouter } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Table from 'react-bootstrap/Table'
import { api } from "../../helpers/api";

class PlayerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      stats : {
        wins: 3,
        loses: 3,
        matches: 6
      }
    };
  }

  async componentDidMount(){
    const playerID = this.props.match.params.playerID;
    try{
      const stats = await api.get(`/participants/${playerID}/statistics`);
      this.setState({stats: stats});
    }catch(error){
      console.log('something bad happened while fetich player stats', error)
    }
  }

  render() {
  return (
    <Container>
      <Row>
        <Col/>
        <Col>
          <div>
            <Table bordered hover size="sm">
              <thead>
                <tr>
                  <th>Wins</th>
                  <th>Loses</th>
                  <th>Matches</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.stats.wins}</td>
                  <td>{this.state.stats.loses}</td>
                  <td>{this.state.stats.matches}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
        <Col/>
      </Row>
    </Container>
  );
  }
}

export default withRouter(PlayerProfile);

import React from "react";
import { withRouter } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import Table from 'react-bootstrap/Table'

class PlayerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      wins: 0,
      loses: 0,
      matches: 0
    };
  }

  renderPlayerStats(player){
    return(
      <tr>
        <td>{player.wins}</td>
        <td>{player.loses}</td>
        <td>{player.matches}</td>
      </tr>

    )
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
                {this.renderPlayerStats}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col/>
      </Row>
    </Container>
  )
  }
}

export default withRouter(PlayerProfile);

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {TipTopTournamentLogo} from "./design/TipTopTournamentLogo";

const Header = props => {
  return (
      <p className="text-center">
          <Row>
              <Col>
                  <TipTopTournamentLogo style={{marginTop:"50px", width:"40%"}}/>
                  <h1 style={{textAlign: "center",color: "#2F80ED"}}>TipTopTournament</h1>
              </Col>
          </Row>
      </p>
  );
};

export default Header;

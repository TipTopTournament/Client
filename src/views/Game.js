import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const Name = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;


const Score = styled.div`
  margin-left: auto;
  margin-right: auto;
  font-weight: light;
`;

const Game = ({ GameData }) => {
    return (
        <Container>
            <Name>{GameData.participant1}</Name> <h6> vs </h6> <Name>{GameData.participant2}</Name>
            <Score>{GameData.score1} </Score><h6> : </h6> <Score>{GameData.score2} </Score>
        </Container>
    );
};

export default Game;
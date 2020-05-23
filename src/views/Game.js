import React from "react";
import styled from "styled-components";
import Alert from 'react-bootstrap/Alert';
const Container = styled.div`;
  width: 280px;
  display: flex;
`;

const GameState = styled.div`
  font-weight: bold;
  color: #06c4ff;
  margin-left: 25px;
`;
const Name = styled.div`
  font-weight: lighter;
  margin-left: 5px;
  margin-right: 5px;
`;

const Score = styled.div`
  font-weight: light;
`;
  const Time = styled.div`
  margin-right: 25px;
  margin-left: auto;
  font-weight: light;
`;

const Game = ({ gameData }) => {
    //To compare ENUM
  if(gameData.gameState=="CONFLICT"){
      return (
          <Container>
              <Alert variant='danger' >
                  Zwei Spieler haben unterschiedliche Scores eingetragen! Geben sie den richtigen Score ein
              </Alert>
              <Time> {gameData.startTime}</Time>
              <Name>{gameData["participant1"]["vorname"]}</Name>
              <Score>{gameData["score1"]} </Score> :
              <Score>{gameData["score2"]} </Score>
              <Name>{gameData["participant2"]["vorname"]}</Name>
              <GameState>{gameData.gameState}</GameState>
          </Container>
      );
  } else {
      return (
          <Container>
              <Time>{gameData.startTime}</Time>
              <Name>{gameData["participant1"]["vorname"]}</Name>
              <Score>{gameData["score1"]} </Score> :
              <Score>{gameData["score2"]} </Score>
              <Name>{gameData["participant2"]["vorname"]}</Name>
              <GameState>{gameData.gameState}</GameState>
          </Container>);

    }
};

export default Game;
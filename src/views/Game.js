  import React from "react";
import styled from "styled-components";
import Alert from 'react-bootstrap/Alert';
import { Button } from "./design/Button";
const Container = styled.div`;
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const GameState = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;
const Name = styled.div`
  font-weight: lighter;
  margin-left: 5px;
`;

const Score = styled.div`
  margin-left: auto;
  margin-right: auto;
  font-weight: light;
`;

const Game = ({ gameData }) => {
  if(gameData.gameState=="CONFLICT")
    return (
        <Container>
              <Alert variant='danger'>
                          Zwei Spieler haben unterschiedliche Scores eingetragen! Geben sie den richtigen Score ein
                        </Alert>}
           <Name>{gameData["participant1"]["vorname"]}</Name>
            <Score>{gameData["score1"]} </Score> :
            <Name>{gameData["participant2"]["vorname"]}</Name>
            <Score>{gameData["score2"]} </Score>
            <GameState>{gameData.gameState}</GameState>
            
        </Container>
    );
    else
    return (
      <Container>
  
         <Name>{gameData["participant1"]["vorname"]}</Name>
          <Score>{gameData["score1"]} </Score> :
          <Name>{gameData["participant2"]["vorname"]}</Name>
          <Score>{gameData["score2"]} </Score>
          <GameState>{gameData.gameState}</GameState>
          
      </Container>);

};

export default Game;
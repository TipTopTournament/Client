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

const Vorname = styled.div`
  color: #06c4ff;
  font-weight: bold;
`;

const Nachname = styled.div`
  font-weight: lighter;
  margin-left: 5px;
`;

const Wins = styled.div`
  margin-left: auto;
  margin-right: auto;
  font-weight: light;
`;

const LeaderBoardPlayer = ({ leaderBoardUser }) => {
    return (
        <Container>
            <Vorname>{leaderBoardUser["participant"].vorname}</Vorname>
            <Nachname>{leaderBoardUser["participant"].nachname}</Nachname>
            <Wins>Wins: {leaderBoardUser.wins} </Wins>
        </Container>
    );
};

export default LeaderBoardPlayer;
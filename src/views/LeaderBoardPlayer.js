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

const LeaderBoardPlayer = ({ LeaderBoardUser }) => {
    return (
        <Container>
            <Name>{LeaderBoardUser.name}</Name>
            <Score>{LeaderBoardUser.elo} </Score>
            <Score>{LeaderBoardUser.stats} </Score>
        </Container>
    );
};

export default LeaderBoardPlayer;
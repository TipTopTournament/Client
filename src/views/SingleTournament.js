import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 2px solid #ffffff26;
`;

const Name = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;


const TournamentCode = styled.div`
  margin-left: 10px;
  font-weight: bold;
`;

const SingleTournament = ({ tournamentData }) => {
    return (
        <Container>
            <Name>{tournamentData.tournamentName}</Name><TournamentCode>Code: {tournamentData.tournamentCode}</TournamentCode>
        </Container>
    );
};

export default SingleTournament;

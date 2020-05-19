import styled from "styled-components";

export const TournamentContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid  #2F80ED;
  border-radius: 50px;
  padding: 0.25em 1em;   
  margin: 1em;
    &:hover {
    transform: translateY(-2px);
  }
`;
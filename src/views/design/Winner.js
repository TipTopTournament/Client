import React from "react";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";



const Name = styled.div`
  font-weight: bold;
  font-size 24px;
  color: #06c4ff;
`;


/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Winner = ({ winnerFromBracket }) => {
    return (
        <Container>
            <Row>
                <Col />
                <Col>
            <Name>{"Congrats to " + winnerFromBracket.vorname + " " + winnerFromBracket.nachname + " for winning the tournament!"}</Name>
                </Col>
                <Col />
            </Row>
        </Container>
    );
};

export default Winner;
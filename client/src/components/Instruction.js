import React from "react";
import styled from "styled-components";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const StyledContainer = styled(Container)`
  color: white;
`;
const StyledHeader = styled(Col)`
  font-size: 2rem;
  font-weight: bold;
  margin: auto;
`;

const StyledCol = styled(Col)`
  margin: auto;
  text-align: left;
`;

const StyledListGroup = styled(ListGroup)`
  background: #222831 !important;
  margin: 0.5rem;
  font-size: 0.75rem;
`;

const StyledListGroupItem = styled(ListGroup.Item)`
  background-color: #222831 !important;
  color: white;
`;

const Instruction = props => {
  return (
    <StyledContainer className="container-fluid">
      <Row>
        <StyledHeader lg={6} sm={12}>Instructions</StyledHeader>
      </Row>
      <Row>
        <StyledCol lg={6} sm={12}>
          <StyledListGroup>
            <StyledListGroupItem>:i to enter insert mode</StyledListGroupItem>
            <StyledListGroupItem>esc to enter default mode</StyledListGroupItem>
            <StyledListGroupItem>:w filename to save file</StyledListGroupItem>
            <StyledListGroupItem>
              :export to save file to database
            </StyledListGroupItem>
            <StyledListGroupItem>:q to logout</StyledListGroupItem>
            <StyledListGroupItem>To write to database you have to insert some text into the editor, save the file and export.</StyledListGroupItem>
          </StyledListGroup>
        </StyledCol>
      </Row>
    </StyledContainer>
  );
};

export default Instruction;

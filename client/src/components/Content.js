import React, { Component } from "react";
import Instruction from "./Instruction";
import DatabaseView from "./DatabaseView";
import Vim from "./Vim";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";

const StyledRow = styled(Row)`
  margin: 1rem;
  color: white;
`;

class Content extends Component {

  updateContent = content => {
    this.forceUpdate();
  }

  render() {
    return (
      <Container>
        <StyledRow>
          <Col>
            <Instruction />
          </Col>
        </StyledRow>

        <StyledRow>
          <Col>
            {this.props.state.uuid ? <DatabaseView user={this.props.state} /> : null}
          </Col>
        </StyledRow>

        <StyledRow>
          <Col>
            <Vim updateContent={this.updateContent} user={this.props.state} />
          </Col>
        </StyledRow>
      </Container>
    );
  }
}

export default Content;

import React, { Component } from "react";
import Axios from "axios";
import styled from "styled-components";
import firebase from "firebase/app";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

const StyledButton = styled(Button)`
  color: #eeeeee;
  font-size: 1rem;
  margin: 0;
  padding: 0.25rem 1rem;
  border: 2px solid #00adb5;
  border-radius: 3px;
  background-color: #393e46 !important;
`;

const StyledCol = styled(Col)`
  margin: auto;
`;

class SignInButton extends Component {
  onClick = async e => {
    const resRandom = await Axios.get("https://randomuser.me/api/?results=1");
    const userData = resRandom.data.results.pop();

    this.props.set(userData.login.uuid);

    const firebasePromise = await firebase
      .app()
      .auth()
      .signInAnonymously();
    const responsePromise = await Axios.post("/api/auth", { userData });
    await Promise.all([firebasePromise, responsePromise]);
    this.props.history.push("/secret");
  };

  render() {
    return (
      <Container>
        <Row>
          <StyledCol sm={4}>
            <StyledButton onClick={this.onClick}>Click me!</StyledButton>
          </StyledCol>
        </Row>
      </Container>
    );
  }
}

export default SignInButton;

import React, { Component } from "react";
import Axios from "axios";
import styled from "styled-components";
import firebase from "firebase";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { SECRET } from "../constants/routes";

const StyledButton = styled(Button)`
  color: #eeeeee;
  font-size: 1rem;
  margin: 0;
  padding: 0.25rem 1rem;
  border: 2px solid #00adb5;
  border-radius: 3px;
  background-color: #393e46 !important;
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
    console.log("dnwaodnawo");
    this.props.history.push("/secret");
  };

  render() {
    return (
      // <Link to={SECRET}>
        <StyledButton onClick={this.onClick}>Click me!</StyledButton>
      // </Link>
    );
  }
}

export default SignInButton;

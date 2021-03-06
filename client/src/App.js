import React, { Component } from "react";
import Secret from "./components/Secret";
import SignInButton from "./components/SignInButton";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import config from "./firebase_config";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const StyledWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #222831;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const Wrapper = props => {
  return <StyledWrapper>{props.children}</StyledWrapper>;
};

class App extends Component {
  state = {
    uuid: ""
  };

  set = body => {
    this.setState({ uuid: body });
  };

  render() {
    return (
      <Wrapper>
        <FirebaseAuthProvider {...config} firebase={firebase}>
          <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              return (
                <Router>
                  <Switch>
                    <Route
                      exact path="/"
                      render={props => (
                        <SignInButton {...props} set={this.set} />
                      )}
                    />
                    <Route
                      exact path="/secret"
                      render={props => {
                        if (isSignedIn === true) {
                          return <Secret set={this.set} state={this.state} />;
                        } else {
                          return <Redirect to="/" />;
                        }
                      }}
                    />
                  </Switch>
                </Router>
              );
            }}
          </FirebaseAuthConsumer>
        </FirebaseAuthProvider>
      </Wrapper>
    );
  }
}

export default App;

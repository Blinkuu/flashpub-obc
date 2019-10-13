import React, { Component } from "react";
import styled from "styled-components";
import Axios from "axios";
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

class DatabaseView extends Component {
  state = {
    content: "",
    email: "",
    name: ""
  };

  componentDidMount() {
    this.callApi();
  }

  componentWillReceiveProps() {
    this.callApi();
  }

  callApi = async () => {
    const uuid = this.props.user.uuid;
    const responsePromise = await Axios.get("/api/secret/" + uuid);
    
    const content = responsePromise.data[uuid].content;
    const name = responsePromise.data[uuid].name;
    const wholeName = `${name.title} ${name.first} ${name.last}`;
    const email = responsePromise.data[uuid].email;
    this.setState({
      content: content,
      email: email,
      name: wholeName
    });
  };

  render() {
    return (
      <StyledContainer className="container-fluid">
        <Row>
          <StyledHeader sm={4}>Database view</StyledHeader>
        </Row>
        <Row>
          <StyledCol sm={4}>
            <StyledListGroup>
              <StyledListGroupItem>Content: {this.state.content}</StyledListGroupItem>
              <StyledListGroupItem>Email: {this.state.email}</StyledListGroupItem>
              <StyledListGroupItem>Name: {this.state.name}</StyledListGroupItem>
            </StyledListGroup>
          </StyledCol>
        </Row>
      </StyledContainer>
    );
  }
}
export default DatabaseView;

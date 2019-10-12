import React from "react";
import Content from "./Content";

const Secret = props => {
  return (
    <React.Fragment>
      <Content set={props.set} state={props.state} />
    </React.Fragment>
  );
};

export default Secret;

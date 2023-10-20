import React from "react";
import { connect } from "react-redux";

import IntroComponent from "./Intro.Component";
import { IntroContainer } from "./Intro.Types";
import { SET_AUTH } from "../../Redux/Slice/Authentication/Authentication.slice";

const IntroContainers: React.FC<IntroContainer> = (props) => (
  <IntroComponent {...props} />
);
const mapStateToProps = (state, ownProps) => ({
  auth: state.authentication.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  setLogin: (params: string) => dispatch(SET_AUTH(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IntroContainers);

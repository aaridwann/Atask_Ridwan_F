import React from 'react';
import { connect } from 'react-redux';

import IntroComponent from './Intro.Component';
import { IntroContainer } from './Intro.Types';
import { SET_AUTH } from '../../Redux/Slice/Authentication/Authentication.slice';

const IntroContainers: React.FC<IntroContainer> = (props) => (
	<IntroComponent {...props} />
);
const mapStateToProps = (state, ownProps) => ({
	...state,
	...ownProps,
});

const mapDispatchToProps = () => ({
	setLogin: (params: string) => SET_AUTH(params),
});

export default connect(mapStateToProps, mapDispatchToProps)(IntroContainers);

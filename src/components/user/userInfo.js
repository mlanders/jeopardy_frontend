import React from 'react';
import styled from 'styled-components';
import { useStateValue } from 'react-conflux';
import { userContext } from '../../conflux/userReducer';

const UserInfo = () => {
	const [state] = useStateValue(userContext);

	return (
		// <StateProvider reducer={userReducer} stateContext={userContext}>
		<>
			<div className='container'>
				<H1>{state.userProfile.name}</H1>
				<UID>UID: {state.userProfile.uid}</UID>
				<UserImg src={state.userProfile.photo} alt={state.userProfile.name} />
			</div>
		</>
		// </StateProvider>
	);
};

export default UserInfo;

const UserImg = styled.img`
	width: 100px;
	border-radius: 4px;
	margin-top: 10px;
`;
const H1 = styled.div`
	font-size: 2rem;
`;

const UID = styled.p`
	color: lightgray;
`;

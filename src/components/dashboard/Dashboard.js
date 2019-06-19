import React from "react";
import { Route, NavLink } from "react-router-dom";
import styled from "styled-components";

//Components
import UserInfo from "../user/userInfo";
import Games from "../game/games";
import Questions from "../questions/Questions";
import GameView from "../game/gameView";

const Dashboard = props => {
	return (
		<>
			<Styles>
				<NavLink
					to='/games'
					className='dashboardTabs'
					activeClassName='selected'
				>
					All Games
				</NavLink>
				<NavLink
					to='/questions'
					className='dashboardTabs'
					activeClassName='selected'
				>
					All Questions
				</NavLink>
			</Styles>
			<Route path='/user' render={props => <UserInfo {...props} />} />
			<Route exact path='/games' render={props => <Games {...props} />} />
			<Route
				exact
				path='/questions'
				render={props => <Questions {...props} />}
			/>
			<Route
				path='/games/:id'
				render={props => <GameView {...props} db={props.db} />}
			/>
		</>
	);
};

export default Dashboard;

const Styles = styled.div`
	display: flex;
	max-width: 800px;
	width: 100%;
	justify-content: center;
	margin: 0 auto;
	.dashboardTabs {
		display: flex;
		width: 150px;
		margin: 0 5px;
		border: 1px solid #313638;
		background-color: #fff;
		border-radius: 4px;
		padding: 10px 15px;
		justify-content: center;
		text-decoration: none;
		color: #313638;
	}
	.selected {
		background-color: #e0dfd5;
		color: #313638;
	}
`;

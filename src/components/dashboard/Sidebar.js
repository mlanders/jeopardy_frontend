import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Sidebar = () => {
	return (
		<Styles>
			<NavLink to='/games' className='dashboardTabs' activeClassName='selected'>
				Games
			</NavLink>
			<NavLink
				to='/questions'
				className='dashboardTabs'
				activeClassName='selected'
			>
				Questions
			</NavLink>
			<NavLink to='/user' className='dashboardTabs' activeClassName='selected'>
				Settings
			</NavLink>
		</Styles>
	);
};

export default Sidebar;

const Styles = styled.div`
	max-width: 125px;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #e0dfd5;
	.dashboardTabs {
		display: flex;
		background-color: #fff;
		padding: 20px 15px;
		justify-content: flex-start;
		text-decoration: none;
		color: #313638;
		:hover {
			background-color: #337ab7;
			color: #fff;
		}
	}
	.selected {
		background-color: #337ab7;
		color: #fff;
	}
`;

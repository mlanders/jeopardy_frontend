import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Dashboard = () => {
    return (
        <Styles>
            <NavLink
                to="/games"
                className="dashboardTabs"
                activeClassName="selected">
                All Games
            </NavLink>
            <NavLink
                to="/questions"
                className="dashboardTabs"
                activeClassName="selected">
                All Questions
            </NavLink>
        </Styles>
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

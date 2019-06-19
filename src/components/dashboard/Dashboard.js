import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';

//Components
import UserInfo from '../user/userInfo';
import Games from '../game/games';
import Questions from '../questions/Questions';
import GameView from '../game/gameView';

const Dashboard = props => {
    return (
        <>
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
            <Route path="/user" render={props => <UserInfo {...props} />} />
            <Route exact path="/games" render={props => <Games {...props} />} />
            <Route
                exact
                path="/questions"
                render={props => <Questions {...props} />}
            />
            <Route
                path="/games/:id"
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
    box-shadow: 1px 1px 4px gray;
    margin: 0 auto;
    .dashboardTabs {
        display: flex;
        width: 50%;

        background-color: #fff;
        padding: 10px 15px;
        justify-content: center;
        text-decoration: none;
        color: #313638;
    }
    .selected {
        background-color: #337ab7;
        color: #fff;
    }
`;

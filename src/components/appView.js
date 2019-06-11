import React, { useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Games from './game/games';
import QuestionView from './game/questionView';
import UserInfo from './user/userInfo';
import GameView from './game/gameView';

const AppView = ({ db, user }) => {
    return (
        <>
            <Link to="/user" style={{ margin: '5px' }}>
                User
            </Link>
            <Link to="/games" style={{ margin: '5px' }}>
                Games
            </Link>
            <Switch>
                <Route
                    path="/user"
                    render={props => <UserInfo {...props} user={user} />}
                />
                <Route
                    exact
                    path="/games"
                    render={props => <Games {...props} db={db} user={user} />}
                />
                <Route
                    path="/games/:id"
                    render={props => <GameView {...props} />}
                />
            </Switch>
        </>
    );
};

export default AppView;

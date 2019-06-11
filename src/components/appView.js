import React, { useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Games from './game/games';
import QuestionView from './game/questionView';
import UserInfo from './user/userInfo';
import GameView from './game/gameView';

const AppView = ({ db, data, setData, user }) => {
    return (
        <>
            <Link to="/user">User</Link>
            <Link to="/games">Games</Link>
            <Switch>
                <Route
                    path="/user"
                    render={props => <UserInfo {...props} user={user} />}
                />
                <Route
                    path="/games"
                    render={props => (
                        <Games
                            {...props}
                            data={data}
                            db={db}
                            setData={setData}
                            user={user}
                        />
                    )}
                />
                <Route path="/games/:gameID" exact component={GameView} />
                <Games db={db} data={data} setData={setData} user={user} />
            </Switch>
        </>
    );
};

export default AppView;

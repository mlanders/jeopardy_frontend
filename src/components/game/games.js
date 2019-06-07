import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewGame from './newGame';
import QuestionView from './questionView';
import GameView from './gameView';

const Games = ({ db, data, setData, user }) => {
    db.collection('games')
        .where('author', '==', user.uid)
        .onSnapshot(function(snapshot) {
            let changes = snapshot.docChanges();
            let update = [];
            changes.forEach(change => {
                update.push(change.doc.data());
            });
            setData(update);
        });

    return (
        <div>
            <NewGame user={user} />
            <QuestionView />
            <h1>Games</h1>
            {data.map(game => {
                return (
                    <Link to={`games/${game.gameName}`}>{game.gameName}</Link>
                );
            })}
        </div>
    );
};

export default Games;

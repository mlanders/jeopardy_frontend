import React from 'react';
import { StateProvider, useStateValue } from 'react-conflux';
import { userReducer } from '../../store/reducers/userReducer';
import { userContext } from '../../store/context';

const GameView = props => {
    const [state, dispatch] = useStateValue(userContext);

    let game = state.games.filter(game => {
        console.log('GAME! ', typeof game.id);
        console.log('MATCH: ', typeof props.match.params.id);
        return game.id === props.match.params.id;
    });
    console.log('GAME! ', game);
    return (
        <StateProvider reducer={userReducer} stateContext={userContext}>
            <div>
                {/* <p>{state.games.gameName}</p> */}
                <p>{game[0].id}</p>
            </div>
        </StateProvider>
    );
};

export default GameView;

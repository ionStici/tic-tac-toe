import React from 'react';
import './styles/base.scss';

import NewGame from './components/NewGame';
import Game from './components/Game';

// // // // // // // // // // // // // // //

function App() {
    const [play, setPlay] = React.useState(false);
    const [gameState, setGameState] = React.useState();

    const startNewGame = function (state) {
        setPlay(true);
        setGameState(state);
    };

    // TEMPORARY
    React.useEffect(() => setPlay(true), []);
    React.useEffect(() => {
        setGameState({
            player1: 'x',
            player2: 'o',
            currentPlayer: 'x',
            gameMode: '2',
        });
    }, []);

    if (!play) return <NewGame startNewGame={startNewGame} />;
    if (play) return <Game gameState={gameState} />;
}

export default App;

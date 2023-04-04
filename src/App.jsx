import React from 'react';
import './styles/base.scss';

import NewGame from './components/NewGame';
import Game from './components/Game';

// // // // // // // // // // // // // // //

function App() {
    const [gameState, setGameState] = React.useState({
        play: false,
        player1: '',
        player2: '',
        currentPlayer: 'x',
        gameMode: '', // 1 is when playing with CPU / 2 is when playing in 2 players mode
    });

    // TEMPORARY
    // React.useEffect(() => {
    //     setGameState({
    //         play: true,
    //         player1: 'x',
    //         player2: 'o',
    //         currentPlayer: 'x',
    //         gameMode: '2',
    //     });
    // }, []);

    const startNewGame = function (player1, player2, gameMode) {
        setGameState({
            play: true,
            player1: player1,
            player2: player2,
            currentPlayer: 'x',
            gameMode: gameMode,
        });
    };

    if (!gameState.play) return <NewGame startNewGame={startNewGame} />;
    if (gameState.play) return <Game />;
}

export default App;

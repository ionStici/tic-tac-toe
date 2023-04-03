import React, { useState } from 'react';
import './styles/base.scss';

import icon_o_outline from './assets/icon-o-outline.svg';
import icon_o from './assets/icon-o.svg';

import icon_x from './assets/icon-x.svg';
import icon_x_outline from './assets/icon-x-outline.svg';

import restart from './assets/icon-restart.svg';
import logo from './assets/logo.svg';

import NewGame from './components/NewGame';
import Game from './components/Game';

import { assets } from './Assets';

const icons = [icon_o, icon_o_outline, icon_x, icon_x_outline, restart, logo];
icons.forEach(img => (new Image().src = img));

// // // // // // // // // // // // // // //

function App() {
    const [gameMode, setGameMode] = useState('');
    const [player_1, setPlayer_1] = useState('');
    const [current, setCurrent] = useState('x');

    const startNewGame = function (mode, player1) {
        setGameMode(mode);
        setPlayer_1(player1);
    };

    if (!gameMode) {
        return <NewGame startNewGame={startNewGame} />;
    }

    if (gameMode) {
        return (
            <Game
                logo={logo}
                restart={restart}
                icon_o={icon_o}
                icon_x={icon_x}
            />
        );
    }
}

export default App;

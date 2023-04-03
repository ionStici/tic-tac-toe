import React, { useEffect, useState } from 'react';
import './styles/base.scss';

import icon_o_outline from './assets/icon-o-outline.svg';
import icon_o from './assets/icon-o.svg';

import icon_x from './assets/icon-x.svg';
import icon_x_outline from './assets/icon-x-outline.svg';

import restart from './assets/icon-restart.svg';
import logo from './assets/logo.svg';

import { ButtonReset } from './components/Buttons';
import NewGame from './components/NewGame';
import Prompt from './components/Prompt';

const icons = [icon_o, icon_o_outline, icon_x, icon_x_outline, restart, logo];
icons.forEach(img => (new Image().src = img));

// // // // // // // // // // // // // // //

const Game = function () {};

function App() {
    const [gameMode, setGameMode] = useState('');
    const [player_1, setPlayer_1] = useState('');
    const [current, setCurrent] = useState('x');

    const startNewGame = function (mode, player1) {
        setGameMode(mode);
        setPlayer_1(player1);
    };

    if (!gameMode) {
        return <NewGame logo={logo} startNewGame={startNewGame} />;
    }

    if (gameMode) {
        return (
            <>
                <p>text</p>
            </>
        );
    }
}

export default App;

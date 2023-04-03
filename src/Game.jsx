import React, { useState } from 'react';

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

const Game = function () {
    const players = useState(null);

    // const setPlayers = (num) => players.

    return (
        <>
            <NewGame logo={logo} x={icon_x} o={icon_o} />
            {/* <Prompt /> */}
            {/* <ButtonReset icon={restart} /> */}
        </>
    );
};

// // // // // // // // // // // // // // //

export default Game;

import icon_o_outline from './assets/icon-o-outline.svg';
import icon_o from './assets/icon-o.svg';

import icon_x from './assets/icon-x.svg';
import icon_x_outline from './assets/icon-x-outline.svg';

import restart from './assets/icon-restart.svg';
import logo from './assets/logo.svg';

import { ButtonMain, ButtonReset } from './components/Buttons';
import Prompt from './components/Prompt';

const icons = [icon_o, icon_o_outline, icon_x, icon_x_outline, restart, logo];
icons.forEach(img => (new Image().src = img));

// // // // // // // // // // // // // // //

const NewGame = function () {
    return (
        <>
            <header>
                <img src={logo} alt="Logo" />
            </header>

            <div>
                <p>Pick Player 1's Mark</p>
                <div>
                    <img src={icon_x} alt="" />
                    <img src={icon_o} alt="" />
                </div>
                <p>Remember : X Goes First</p>
            </div>

            <div>
                <ButtonMain text="New Game (VS CPU)" color="yellow" />
                <ButtonMain text="New Game (VS Player)" color="blue" />
            </div>
        </>
    );
};

// // // // // // // // // // // // // // //

const Game = function () {
    return (
        <>
            <NewGame />
            <Prompt />
            <ButtonReset icon={restart} />
        </>
    );
};

// // // // // // // // // // // // // // //

export default Game;

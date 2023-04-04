import { ButtonMain } from './Buttons';
import styles from './../styles/NewGame.module.scss';
import { assets } from '../assets/Assets';
import { useState } from 'react';

const NewGame = function (props) {
    const [player1, setPlayer1] = useState('x');
    const [player2, setPlayer2] = useState('o');

    const switchMark = function ({ target }) {
        const marks = document.querySelectorAll(`.${styles.box}`);
        marks.forEach(box => box.classList.remove(styles.active));
        target.closest(`.${styles.box}`).classList.add(styles.active);

        const active = target.closest(`.${styles.active}`);
        setPlayer1(active.dataset.mark);
        setPlayer2(
            active.nextElementSibling?.dataset.mark ||
                active.previousElementSibling?.dataset.mark
        );
    };

    const startNewGame = ({ target }) => {
        props.startNewGame({
            player1: player1,
            player2: player2,
            currentPlayer: 'x',
            gameMode: target.dataset.mode,
        });
    };

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <img className={styles.logo} src={assets.logo} alt="Logo" />
            </header>

            <div className={styles.panel}>
                <p className={styles.title}>Pick Player 1's Mark</p>

                <div className={styles.wrapper}>
                    <div
                        className={`${styles.box} ${styles.active}`}
                        data-mark="x"
                        onClick={switchMark}
                    >
                        <svg
                            className={styles.x}
                            width="64"
                            height="64"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {assets.path_x}
                        </svg>
                    </div>

                    <div
                        className={styles.box}
                        data-mark="o"
                        onClick={switchMark}
                    >
                        <svg
                            className={styles.o}
                            width="64"
                            height="64"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {assets.path_o}
                        </svg>
                    </div>
                </div>

                <p className={styles.text}>Remember : X Goes First</p>
            </div>

            <div className={styles.buttonBox}>
                <ButtonMain
                    handleClick={startNewGame}
                    text="New Game (VS CPU)"
                    color="yellow"
                />
                <ButtonMain
                    handleClick={startNewGame}
                    text="New Game (VS Player)"
                    color="blue"
                />
            </div>
        </section>
    );
};

export default NewGame;

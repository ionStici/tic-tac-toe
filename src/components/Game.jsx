import styles from './../styles/Game.module.scss';
import { ButtonReset } from './Buttons';
import { assets } from '../assets/Assets';
import React, { useState } from 'react';
import Prompt from './Prompt';

const Game = function (props) {
    const state = props.gameState;
    const [play, setPlay] = useState(true);

    const [player1, setPlayer1] = useState(state.player1);
    const [player2, setPlayer2] = useState(state.player2);

    const [gameMode, setGameMode] = useState(state.gameMode);
    const [currentPlayer, setCurrentPlayer] = useState(state.currentPlayer);

    const [score_x, setScore_x] = useState(0);
    const [score_o, setScore_o] = useState(0);
    const [score_ties, setScore_ties] = useState(0);

    const [prompt, setPrompt] = useState('');

    // // // // // // // // // // // // // // //
    // CHECK WINNER

    const checkWinner = function (boxes) {
        const marks = ['1', '2', '3', '4', '5', '6', '7', '8'].map(num => {
            return [].slice.call(boxes).filter(t => t.classList.contains(num));
        });
        const winnerMarks = marks.filter(marks => {
            return marks.every(mark => {
                return mark.dataset.mark === currentPlayer;
            });
        });

        winnerMarks[0]?.forEach(box => {
            let svg;

            if (box.dataset.mark === 'x') {
                svg = box.querySelector(`.${styles.mark_x}`);
                box.classList.add(styles.x_winner);
            }

            if (box.dataset.mark === 'o') {
                svg = box.querySelector(`.${styles.mark_o}`);
                box.classList.add(styles.o_winner);
            }

            svg.classList.add(styles.mark_winner);
            svg.classList.remove(styles.mark_fade_in);
            setTimeout(() => svg.classList.add(styles.mark_fade_in), 1);

            setPlay(false);
        });

        // UPDATE SCORE
        if (winnerMarks[0]) {
            if (winnerMarks[0][0].dataset.mark === 'x') updateScore('x');
            if (winnerMarks[0][0].dataset.mark === 'o') updateScore('o');

            setTimeout(() => {
                setPrompt(
                    <Prompt
                        message=""
                        title="Restart Game?"
                        cancel_text="No, Cancel"
                        restart_text="Yes, Restart"
                        cancel_event={closePrompt}
                        restart_event={restartGame}
                    />
                );
            }, 1000);

            return;
        }

        // CHECK IF TIE
        const tie = [].slice.call(boxes).every(box => {
            if (box.dataset.mark) return true;
        });

        if (tie) {
            setPlay(false);
            updateScore('tie');

            setTimeout(() => {
                setPrompt(
                    <Prompt
                        message=""
                        title="Restart Game?"
                        cancel_text="No, Cancel"
                        restart_text="Yes, Restart"
                        cancel_event={closePrompt}
                        restart_event={restartGame}
                    />
                );
            }, 1000);
        }
    };

    // // // // // // // // // // // // // // //

    const updateScore = function (winner) {
        if (winner === 'x') setScore_x(prev => (prev = prev + 1));
        if (winner === 'o') setScore_o(prev => (prev = prev + 1));
        if (winner === 'tie') setScore_ties(prev => (prev = prev + 1));
    };

    // // // // // // // // // // // // // // //

    const setActive = ({ target }) => {
        if (play) {
            if (target.dataset.mark) return;
            target.dataset.mark = currentPlayer;

            const img = target.querySelector('img');
            img.classList.remove(styles.mark_hover_display);
            img.src = undefined;

            let currTurnMark;
            let nextTurnMark;

            const x = target.querySelector(`.${styles.mark_x}`);
            const o = target.querySelector(`.${styles.mark_o}`);

            if (currentPlayer === 'x') {
                currTurnMark = document.querySelector(`.${styles.turn_mark_x}`);
                nextTurnMark = document.querySelector(`.${styles.turn_mark_o}`);
                nextTurnMark.classList.add(styles.turn_mark_fade_out);

                x?.classList.add(styles.mark_display);
                setTimeout(() => x?.classList.add(styles.mark_fade_in), 1);
            }

            if (currentPlayer === 'o') {
                currTurnMark = document.querySelector(`.${styles.turn_mark_o}`);
                nextTurnMark = document.querySelector(`.${styles.turn_mark_x}`);

                o?.classList.add(styles.mark_display);
                setTimeout(() => o?.classList.add(styles.mark_fade_in), 1);
            }

            if (currentPlayer === 'x') {
                setCurrentPlayer('o');

                currTurnMark.classList.add(styles.turn_mark_fade_out);
                nextTurnMark.classList.remove(styles.turn_mark_fade_out);
            }

            if (currentPlayer === 'o') {
                setCurrentPlayer('x');

                currTurnMark.classList.add(styles.turn_mark_fade_out);
                nextTurnMark.classList.remove(styles.turn_mark_fade_out);
            }

            checkWinner(target.parentElement.children);
        }
    };

    // // // // // // // // // // // // // // //
    // HOVER EVENTS

    const onHover = ({ target }) => {
        if (play) {
            if (target.dataset.mark) return;
            const img = target.querySelector('img');

            img.src =
                currentPlayer === 'x'
                    ? assets.icon_x_outline
                    : assets.icon_o_outline;
            img.classList.add(styles.mark_hover_display);
            setTimeout(() => img.classList.add(styles.mark_hover_show));
        }
    };

    const leaveHover = ({ target }) => {
        if (play) {
            if (target.dataset.mark) return;
            const img = target.querySelector('img');

            img.classList.remove(styles.mark_hover_show);
            setTimeout(() => {
                img.classList.remove(styles.mark_hover_display);
                img.src = undefined;
            }, 250);
        }
    };

    // // // // // // // // // // // // // // //

    const closePrompt = function () {
        document.body.classList.remove(styles.overflow_hidden);
        setPrompt('');
    };

    const restartGame = function () {
        props.restartGame();
    };

    const handleReset = function () {
        document.body.classList.add(styles.overflow_hidden);
        setPrompt(
            <Prompt
                message=""
                title="Restart Game?"
                cancel_text="No, Cancel"
                restart_text="Yes, Restart"
                cancel_event={closePrompt}
                restart_event={restartGame}
            />
        );
    };

    // // // // // // // // // // // // // // //

    return (
        <>
            {prompt}
            <section className={styles.section}>
                <header className={styles.header}>
                    <img className={styles.logo} src={assets.logo} alt="" />
                    <div className={styles.middleBox}>
                        {
                            <svg
                                className={`${styles.turn_mark} ${styles.turn_mark_x}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_x}
                            </svg>
                        }

                        {
                            <svg
                                className={`${styles.turn_mark} ${styles.turn_mark_o} ${styles.turn_mark_fade_out}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_o}
                            </svg>
                        }
                        <p>Turn</p>
                    </div>
                    <ButtonReset onClick={handleReset} />
                </header>

                <div className={styles.wrapper}>
                    <div
                        className={`${styles.box} 1 4 8`}
                        onClick={setActive}
                        onMouseOver={onHover}
                        onMouseOut={leaveHover}
                        data-mark=""
                    >
                        <img
                            className={styles.mark_hover}
                            src={undefined}
                            alt=""
                        />

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_x}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_x}
                            </svg>
                        }

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_o}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_o}
                            </svg>
                        }
                    </div>

                    <div
                        className={`${styles.box} 1 5`}
                        onClick={setActive}
                        onMouseOver={onHover}
                        onMouseOut={leaveHover}
                        data-mark=""
                    >
                        <img
                            className={styles.mark_hover}
                            src={undefined}
                            alt=""
                        />

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_x}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_x}
                            </svg>
                        }

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_o}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_o}
                            </svg>
                        }
                    </div>

                    <div
                        className={`${styles.box} 1 6 7`}
                        onClick={setActive}
                        onMouseOver={onHover}
                        onMouseOut={leaveHover}
                        data-mark=""
                    >
                        <img
                            className={styles.mark_hover}
                            src={undefined}
                            alt=""
                        />

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_x}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_x}
                            </svg>
                        }

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_o}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_o}
                            </svg>
                        }
                    </div>

                    <div
                        className={`${styles.box} 2 4`}
                        onClick={setActive}
                        onMouseOver={onHover}
                        onMouseOut={leaveHover}
                        data-mark=""
                    >
                        <img
                            className={styles.mark_hover}
                            src={undefined}
                            alt=""
                        />

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_x}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_x}
                            </svg>
                        }

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_o}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_o}
                            </svg>
                        }
                    </div>

                    <div
                        className={`${styles.box} 2 5 7 8`}
                        onClick={setActive}
                        onMouseOver={onHover}
                        onMouseOut={leaveHover}
                        data-mark=""
                    >
                        <img
                            className={styles.mark_hover}
                            src={undefined}
                            alt=""
                        />

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_x}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_x}
                            </svg>
                        }

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_o}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_o}
                            </svg>
                        }
                    </div>

                    <div
                        className={`${styles.box} 2 6`}
                        onClick={setActive}
                        onMouseOver={onHover}
                        onMouseOut={leaveHover}
                        data-mark=""
                    >
                        <img
                            className={styles.mark_hover}
                            src={undefined}
                            alt=""
                        />

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_x}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_x}
                            </svg>
                        }

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_o}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_o}
                            </svg>
                        }
                    </div>

                    <div
                        className={`${styles.box} 3 4 7`}
                        onClick={setActive}
                        onMouseOver={onHover}
                        onMouseOut={leaveHover}
                        data-mark=""
                    >
                        <img
                            className={styles.mark_hover}
                            src={undefined}
                            alt=""
                        />

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_x}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_x}
                            </svg>
                        }

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_o}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_o}
                            </svg>
                        }
                    </div>

                    <div
                        className={`${styles.box} 3 5`}
                        onClick={setActive}
                        onMouseOver={onHover}
                        onMouseOut={leaveHover}
                        data-mark=""
                    >
                        <img
                            className={styles.mark_hover}
                            src={undefined}
                            alt=""
                        />

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_x}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_x}
                            </svg>
                        }

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_o}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_o}
                            </svg>
                        }
                    </div>

                    <div
                        className={`${styles.box} 3 6 8`}
                        onClick={setActive}
                        onMouseOver={onHover}
                        onMouseOut={leaveHover}
                        data-mark=""
                    >
                        <img
                            className={styles.mark_hover}
                            src={undefined}
                            alt=""
                        />

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_x}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_x}
                            </svg>
                        }

                        {
                            <svg
                                className={`${styles.mark} ${styles.mark_o}`}
                                width="64"
                                height="64"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {assets.path_o}
                            </svg>
                        }
                    </div>
                </div>

                <footer className={styles.footer}>
                    <div className={`${styles.total_x} ${styles.total}`}>
                        <p className={styles.title}>
                            X ({player1 === 'x' ? 'P1' : 'P2'})
                        </p>
                        <p className={styles.score}>{score_x}</p>
                    </div>

                    <div className={`${styles.total_ties} ${styles.total}`}>
                        <p className={styles.title}>Ties</p>
                        <p className={styles.score}>{score_ties}</p>
                    </div>

                    <div className={`${styles.total_o} ${styles.total}`}>
                        <p className={styles.title}>
                            O ({player1 === 'x' ? 'P2' : 'P1'})
                        </p>
                        <p className={styles.score}>{score_o}</p>
                    </div>
                </footer>
            </section>
        </>
    );
};

export default Game;

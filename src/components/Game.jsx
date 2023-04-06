import styles from './../styles/Game.module.scss';
import { ButtonReset } from './Buttons';
import { assets } from '../assets/Assets';
import React, { useState } from 'react';

// prettier-ignore
const x = (<svg className={styles.x} width="64" height="64" xmlns="http://www.w3.org/2000/svg">{assets.path_x}</svg>);
// prettier-ignore
const o = (<svg className={styles.o} width="64" height="64" xmlns="http://www.w3.org/2000/svg">{assets.path_o}</svg>);

// prettier-ignore
const icon_x = (<svg className={`${styles.mark_silver} ${styles.mark_silver_hidden}`} width="64" height="64" xmlns="http://www.w3.org/2000/svg">{assets.path_x}</svg>);
// prettier-ignore
const icon_o = (<svg className={`${styles.mark_silver} ${styles.mark_silver_hidden}`} width="64" height="64" xmlns="http://www.w3.org/2000/svg">{assets.path_o}</svg>);

const Game = function (props) {
    const state = props.gameState;
    const [play, setPlay] = useState(true);

    const [player1, setPlayer1] = useState(state.player1);
    const [player2, setPlayer2] = useState(state.player2);

    const [score_x, setScore_x] = useState(0);
    const [score_o, setScore_o] = useState(0);
    const [score_ties, setScore_ties] = useState(0);

    const [gameMode, setGameMode] = useState(state.gameMode);
    const [currentPlayer, setCurrentPlayer] = useState(state.currentPlayer);
    const [mark, setMark] = useState(currentPlayer === 'x' ? x : o);

    // const checkWinner = function (boxes) {
    //     const marks = ['1', '2', '3', '4', '5', '6', '7', '8'].map(num => {
    //         return [].slice.call(boxes).filter(t => t.classList.contains(num));
    //     });

    //     const winnerMarks = marks.filter(marks => {
    //         return marks.every(mark => {
    //             return mark.dataset.mark === currentPlayer;
    //         });
    //     });

    //     winnerMarks[0]?.forEach(box => {
    //         const svg = box.querySelector(`.${styles.mark_silver}`);

    //         if (box.dataset.mark === 'x') {
    //         }

    //         if (box.dataset.mark === 'o') {
    //         }
    //     });

    //     if (winnerMarks[0]) {
    //         winnerMarks[0].forEach(box => {
    //             if (box.dataset.mark === 'x') {
    //                 box.classList.add(styles.x_winner);
    //                 // box.querySelector('img').src = assets.icon_x_outline;
    //             }

    //             if (box.dataset.mark === 'o') {
    //                 box.classList.add(styles.o_winner);
    //                 // box.querySelector('img').src = assets.icon_o_outline;
    //             }
    //         });

    //         setPlay(false);
    //     }
    // };

    const setActive = ({ target }) => {
        if (play) {
            if (target.dataset.mark) return;

            // target.dataset.mark = currentPlayer;
            // const mark = currentPlayer === 'x' ? assets.path_x : assets.path_o;

            if (currentPlayer === 'x') {
                setCurrentPlayer('o');
                setMark(o);
            }

            if (currentPlayer === 'o') {
                setCurrentPlayer('x');
                setMark(x);
            }

            // checkWinner(target.parentElement.children);
        }
    };

    const onHover = ({ target }) => {
        if (play) {
            if (target.dataset.mark) return;

            const img = target.querySelector('img');
            const mark =
                currentPlayer === 'x'
                    ? assets.icon_x_outline
                    : assets.icon_o_outline;

            img.src = mark;
            img.classList.add(styles.mark_hover_transition);
            img.classList.add(styles.mark_hover_reveal);
        }
    };

    const leaveHover = ({ target }) => {
        if (play) {
            if (target.dataset.mark) return;

            const img = target.querySelector('img');

            img.classList.remove(styles.mark_hover_transition);
            img.classList.remove(styles.mark_hover_reveal);
            img.src = undefined;
        }
    };

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <img className={styles.logo} src={assets.logo} alt="" />
                <div className={styles.middleBox}>
                    {mark}
                    <p>Turn</p>
                </div>
                <ButtonReset icon={assets.icon_restart} />
            </header>

            <div className={styles.wrapper}>
                <div
                    className={`${styles.box} 1 4 8`}
                    onClick={setActive}
                    onMouseOver={onHover}
                    onMouseOut={leaveHover}
                    data-mark=""
                >
                    <img className={styles.mark_hover} src={undefined} alt="" />
                </div>

                <div
                    className={`${styles.box} 1 5`}
                    onClick={setActive}
                    onMouseOver={onHover}
                    onMouseOut={leaveHover}
                    data-mark=""
                >
                    <img className={styles.mark_hover} src={undefined} alt="" />
                </div>

                <div
                    className={`${styles.box} 1 6 7`}
                    onClick={setActive}
                    onMouseOver={onHover}
                    onMouseOut={leaveHover}
                    data-mark=""
                >
                    <img className={styles.mark_hover} src={undefined} alt="" />
                </div>

                <div
                    className={`${styles.box} 2 4`}
                    onClick={setActive}
                    onMouseOver={onHover}
                    onMouseOut={leaveHover}
                    data-mark=""
                >
                    <img className={styles.mark_hover} src={undefined} alt="" />
                </div>

                <div
                    className={`${styles.box} 2 5 7 8`}
                    onClick={setActive}
                    onMouseOver={onHover}
                    onMouseOut={leaveHover}
                    data-mark=""
                >
                    <img className={styles.mark_hover} src={undefined} alt="" />
                </div>

                <div
                    className={`${styles.box} 2 6`}
                    onClick={setActive}
                    onMouseOver={onHover}
                    onMouseOut={leaveHover}
                    data-mark=""
                >
                    <img className={styles.mark_hover} src={undefined} alt="" />
                </div>

                <div
                    className={`${styles.box} 3 4 7`}
                    onClick={setActive}
                    onMouseOver={onHover}
                    onMouseOut={leaveHover}
                    data-mark=""
                >
                    <img className={styles.mark_hover} src={undefined} alt="" />
                </div>

                <div
                    className={`${styles.box} 3 5`}
                    onClick={setActive}
                    onMouseOver={onHover}
                    onMouseOut={leaveHover}
                    data-mark=""
                >
                    <img className={styles.mark_hover} src={undefined} alt="" />
                </div>

                <div
                    className={`${styles.box} 3 6 8`}
                    onClick={setActive}
                    onMouseOver={onHover}
                    onMouseOut={leaveHover}
                    data-mark=""
                >
                    <img className={styles.mark_hover} src={undefined} alt="" />
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
    );
};

export default Game;

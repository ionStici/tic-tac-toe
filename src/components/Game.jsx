import styles from './../styles/Game.module.scss';
import { ButtonReset } from './Buttons';
import { assets } from '../assets/Assets';
import React, { useEffect, useState } from 'react';
import Prompt from './Prompt';

const Game = function (props) {
    const state = props.gameState;
    const [play, setPlay] = useState(true);

    const [player1, setPlayer1] = useState(state.player1);
    const [player2, setPlayer2] = useState(state.player2);

    const [gameMode, setGameMode] = useState(state.gameMode);
    const [currentPlayer, setCurrentPlayer] = useState(state.currentPlayer);

    const [difficulty, setDifficulty] = useState(state.difficulty);
    let cpuFirstMove = false;

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
            return marks.every(mark => mark.dataset.mark === currentPlayer);
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
            if (winnerMarks[0][0].dataset.mark === 'x') {
                updateScore('x');
                setTimeout(() => handle_winner_x(), 500);
            }
            if (winnerMarks[0][0].dataset.mark === 'o') {
                updateScore('o');
                setTimeout(() => handle_winner_o(), 500);
            }
        }

        // CHECK IF TIE
        const tie = [].slice.call(boxes).every(box => {
            if (box.dataset.mark) return true;
        });

        if (tie) {
            setPlay(false);
            updateScore('tie');
            setTimeout(() => handle_tie(), 500);
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
        if (play && gameMode === '2') {
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

        if (play && gameMode === '1') {
            if (target.dataset.mark) return;
            target.dataset.mark = player1;

            // // // // // // // // // // // // // // //

            const img = target.querySelector('img');
            img.classList.remove(styles.mark_hover_display);
            img.src = undefined;

            const icon_x = target.querySelector(`.${styles.mark_x}`);
            const icon_o = target.querySelector(`.${styles.mark_o}`);

            if (player1 === 'x') {
                icon_x?.classList.add(styles.mark_display);
                setTimeout(() => icon_x?.classList.add(styles.mark_fade_in), 1);
            }

            if (player1 === 'o') {
                icon_o?.classList.add(styles.mark_display);
                setTimeout(() => icon_o?.classList.add(styles.mark_fade_in), 1);
            }

            setPlay(false);
            const check = checkWinnerCPU();

            // // // // // // // // // // // // // // //
            // TURN ICON
            if (!check) {
                let turn_x = document.querySelector(`.${styles.turn_mark_x}`);
                let turn_o = document.querySelector(`.${styles.turn_mark_o}`);

                if (player1 === 'x') {
                    turn_x.classList.add(styles.turn_mark_fade_out);
                    turn_o.classList.remove(styles.turn_mark_fade_out);
                }

                if (player1 === 'o') {
                    turn_x.classList.remove(styles.turn_mark_fade_out);
                    turn_o.classList.add(styles.turn_mark_fade_out);
                }
            }
            // // // // // // // // // // // // // // //

            if (check) {
                setTimeout(() => handle_you_win(player1), 500);
                return;
            }

            setTimeout(() => cpu_move(difficulty), 500);
        }
    };

    const cpu_move = function (mode) {
        const boxes = [...document.querySelectorAll(`.${styles.box}`)];
        const emptyBoxes = boxes.filter(box => !box.dataset.mark);
        const length = emptyBoxes.length;
        if (length === 0) return;

        // // // // // // // // // // // // // // //
        let box;

        if (mode === 'easy') {
            const random = Math.floor(Math.random() * length + 1);
            box = emptyBoxes[random - 1];
        }

        // // // // // // // // // // // // // // //

        if (mode === 'hard' || mode === 'norm') {
            const lines = ['1', '2', '3', '4', '5', '6', '7', '8'].map(num => {
                return boxes.filter(t => t.classList.contains(num));
            });

            // // // // // // // // // // // // // // //

            const cpuBox = lines
                .map(line => {
                    return line.map(box => {
                        if (box.dataset.mark === player2) return player2;
                        if (box.dataset.mark === '') return box;
                        if (box.dataset.mark === player1) return 'busy';
                    });
                })
                .map(line => {
                    return line.filter(box => {
                        if (box?.dataset?.mark === '') return box;
                        if (box === 'busy') return 'busy';
                    });
                })
                .filter(line => {
                    if (line.length === 1 && line[0] !== 'busy') return line;
                })?.[0]?.[0];

            // // // // // // // // // // // // // // //

            const youBox = lines
                .map(line => {
                    return line.map(box => {
                        if (box.dataset.mark === player1) return player1;
                        if (box.dataset.mark === '') return box;
                        if (box.dataset.mark === player2) return 'busy';
                    });
                })
                .map(line => {
                    return line.filter(box => {
                        if (box?.dataset?.mark === '') return box;
                        if (box === 'busy') return 'busy';
                    });
                })
                .filter(line => {
                    if (line.length === 1 && line[0] !== 'busy') return line;
                })?.[0]?.[0];

            // // // // // // // // // // // // // // //

            const cpuBoxSecond = lines
                .map(line => {
                    return line.map(box => {
                        if (box.dataset.mark === player2) return player2;
                        if (box.dataset.mark === player1) return player2;
                        if (box.dataset.mark === '') return box;
                    });
                })
                .map(line => {
                    return line.filter(box => {
                        if (box?.dataset?.mark === '') return box;
                    });
                })
                .filter(line => {
                    if (line.length === 1 && line[0] !== player2) return line;
                })?.[0]?.[0];

            // // // // // // // // // // // // // // //
            const middleBox = document.querySelectorAll(`.${styles.box}`)[4];

            if (middleBox.dataset.mark === '') {
                box = middleBox;
            } else if (cpuBox) {
                box = cpuBox;
            } else if (youBox) {
                box = youBox;
            } else if (cpuBoxSecond && mode === 'hard') {
                let random;
                random = Math.floor(Math.random() * length + 1);

                let reference;
                reference = emptyBoxes[random - 1];

                const test1 = reference.classList.value
                    .split(' ')
                    .filter(num => num.length === 1);

                const test2 = cpuBoxSecond.classList.value
                    .split(' ')
                    .filter(num => num.length === 1);

                const check = (test1, test2) => {
                    if (test1.length !== test2.length) return false;

                    return test1.every((n, i) => {
                        n === test2[i];
                    });
                };

                while (check(test1, test2)) {
                    random = Math.floor(Math.random() * length + 1);
                    reference = emptyBoxes[random - 1];
                }

                box = reference;
            } else {
                if (
                    player1 === 'x' &&
                    cpuFirstMove === false &&
                    mode === 'hard'
                ) {
                    const boxes = document.querySelectorAll(`.${styles.box}`);

                    const getMark = box => {
                        if (box.dataset.mark === '') return true;
                    };

                    const cornerBoxes = [
                        getMark(boxes[0]) ? boxes[0] : undefined,
                        getMark(boxes[2]) ? boxes[2] : undefined,
                        getMark(boxes[6]) ? boxes[6] : undefined,
                        getMark(boxes[8]) ? boxes[8] : undefined,
                    ].filter(box => box);

                    const random = Math.floor(
                        Math.random() * cornerBoxes.length
                    );

                    box = cornerBoxes[random];

                    cpuFirstMove = true;
                } else {
                    const random = Math.floor(Math.random() * length + 1);
                    box = emptyBoxes[random - 1];
                }
            }
        }

        const img = box.querySelector('img');
        img.classList.remove(styles.mark_hover_display);
        img.src = undefined;

        box.dataset.mark = player2;

        const icon_x = box.querySelector(`.${styles.mark_x}`);
        const icon_o = box.querySelector(`.${styles.mark_o}`);

        if (player2 === 'x') {
            icon_x?.classList.add(styles.mark_display);
            setTimeout(() => icon_x?.classList.add(styles.mark_fade_in), 1);
        }

        if (player2 === 'o') {
            icon_o?.classList.add(styles.mark_display);
            setTimeout(() => icon_o?.classList.add(styles.mark_fade_in), 1);
        }

        // // // // // // // // // // // // // // //

        const check = checkWinnerCPU();

        // // // // // // // // // // // // // // //
        // TURN ICON
        if (!check) {
            let turn_x = document.querySelector(`.${styles.turn_mark_x}`);
            let turn_o = document.querySelector(`.${styles.turn_mark_o}`);

            if (player2 === 'o') {
                turn_x.classList.remove(styles.turn_mark_fade_out);
                turn_o.classList.add(styles.turn_mark_fade_out);
            }

            if (player2 === 'x') {
                turn_x.classList.add(styles.turn_mark_fade_out);
                turn_o.classList.remove(styles.turn_mark_fade_out);
            }
        }
        // // // // // // // // // // // // // // //

        if (check) {
            setTimeout(() => handle_cpu_win(player2), 500);
            return;
        }
        setPlay(true);
    };

    useEffect(() => {
        if (gameMode === '1' && cpuFirstMove === false && player2 === 'x') {
            setPlay(false);
            setTimeout(() => cpu_move(difficulty), 500);
            cpuFirstMove = true;
        }
    }, []);

    const checkWinnerCPU = function () {
        const boxes = [...document.querySelectorAll(`.${styles.box}`)];
        const lines = ['1', '2', '3', '4', '5', '6', '7', '8'].map(num => {
            return boxes.filter(t => t.classList.contains(num));
        });

        const line_x = lines.filter(line => {
            return line.every(box => box.dataset.mark === 'x');
        });

        const line_o = lines.filter(line => {
            return line.every(box => box.dataset.mark === 'o');
        });

        if (line_x[0]) {
            line_x[0].forEach(box => {
                let svg;
                svg = box.querySelector(`.${styles.mark_x}`);
                box.classList.add(styles.x_winner);

                svg.classList.add(styles.mark_winner);
                svg.classList.remove(styles.mark_fade_in);
                setTimeout(() => svg.classList.add(styles.mark_fade_in), 1);

                cpuFirstMove = false;
            });
            updateScore('x');
            return true;
        }

        if (line_o[0]) {
            line_o[0].forEach(box => {
                let svg;
                svg = box.querySelector(`.${styles.mark_o}`);
                box.classList.add(styles.o_winner);

                svg.classList.add(styles.mark_winner);
                svg.classList.remove(styles.mark_fade_in);
                setTimeout(() => svg.classList.add(styles.mark_fade_in), 1);

                cpuFirstMove = false;
            });
            updateScore('o');
            return true;
        }

        const checkTie = boxes.every(box => {
            if (box.dataset.mark === player1 || box.dataset.mark === player2)
                return true;
        });

        if (checkTie) {
            handle_tie();
            updateScore('tie');
        }
    };

    // // // // // // // // // // // // // // //
    // HOVER EVENTS

    const onHover = ({ target }) => {
        if (play) {
            if (target.dataset.mark) return;
            const img = target.querySelector('img');

            if (gameMode === '1') {
                img.src =
                    player1 === 'x'
                        ? assets.icon_x_outline
                        : assets.icon_o_outline;
            }

            if (gameMode === '2') {
                img.src =
                    currentPlayer === 'x'
                        ? assets.icon_x_outline
                        : assets.icon_o_outline;
            }

            img.classList.add(styles.mark_hover_display);
            setTimeout(() => img.classList.add(styles.mark_hover_show), 1);
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
    // CONTROL EVENTS

    // CLOSE PROMPT
    const closePrompt = function () {
        document.body.classList.remove(styles.overflow_hidden);
        setPrompt('');
    };

    // RESTART
    const restartGame = function () {
        document.body.classList.remove(styles.overflow_hidden);
        props.restartGame();
    };

    // NEXT
    const nextRound = function () {
        document.body.classList.remove(styles.overflow_hidden);
        document.querySelectorAll(`.${styles.box}`).forEach(box => {
            box.dataset.mark = '';

            const x = box.querySelector(`.${styles.mark_x}`);
            const o = box.querySelector(`.${styles.mark_o}`);

            x?.classList.remove(styles.mark_display);
            x?.classList.remove(styles.mark_fade_in);
            x?.classList.remove(styles.mark_winner);

            o?.classList.remove(styles.mark_display);
            o?.classList.remove(styles.mark_fade_in);
            o?.classList.remove(styles.mark_winner);

            box.classList.remove(styles.x_winner);
            box.classList.remove(styles.o_winner);
        });

        document
            .querySelector(`.${styles.turn_mark_x}`)
            .classList.remove(styles.turn_mark_fade_out);
        document
            .querySelector(`.${styles.turn_mark_o}`)
            .classList.add(styles.turn_mark_fade_out);

        setCurrentPlayer('x');
        setPlay(true);

        closePrompt();

        if (gameMode === '1' && player2 === 'x') {
            setPlay(false);
            setTimeout(() => cpu_move(difficulty), 500);
        }
    };

    // // // // // // // // // // // // // // //

    const handle_prompt = function (type, winner) {
        document.body.classList.add(styles.overflow_hidden);

        if (type === 'restart') {
            setPrompt(
                <Prompt
                    type="restart"
                    icon={false}
                    message={false}
                    title="Restart Game?"
                    cancel_text="No, Cancel"
                    restart_text="Yes, Restart"
                    cancel_event={closePrompt}
                    restart_event={restartGame}
                />
            );
        }

        if (type === 'tie') {
            setPrompt(
                <Prompt
                    type={false}
                    icon={false}
                    message={false}
                    title="Round Tied"
                    cancel_text="Quit"
                    restart_text="Next Round"
                    quit_event={restartGame}
                    next_event={nextRound}
                />
            );
        }

        if (type === 'next') {
            let num;
            if (winner === player1) num = '1';
            if (winner === player2) num = '2';

            setPrompt(
                <Prompt
                    winner={winner}
                    //
                    type={false}
                    icon={winner === 'x' ? assets.icon_x : assets.icon_o}
                    message={`Player ${num} Wins!`}
                    title="Takes the round"
                    cancel_text="Quit"
                    restart_text="Next Round"
                    quit_event={restartGame}
                    next_event={nextRound}
                />
            );
        }

        if (type === 'cpu') {
            const youLost = 'Oh no, you lost...';
            const youWin = 'You won!';

            setPrompt(
                <Prompt
                    winner={winner}
                    //
                    type={false}
                    icon={winner === 'x' ? assets.icon_x : assets.icon_o}
                    //
                    message={winner === player1 ? youWin : youLost}
                    title="Takes the round"
                    //
                    cancel_text="Quit"
                    restart_text="Next Round"
                    //
                    quit_event={restartGame}
                    next_event={nextRound}
                />
            );
        }
    };

    const handle_restart = () => handle_prompt('restart');
    const handle_tie = () => handle_prompt('tie');

    const handle_winner_x = () => handle_prompt('next', 'x');
    const handle_winner_o = () => handle_prompt('next', 'o');

    const handle_you_win = winner => handle_prompt('cpu', winner);
    const handle_cpu_win = winner => handle_prompt('cpu', winner);

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
                    <ButtonReset onClick={handle_restart} />
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

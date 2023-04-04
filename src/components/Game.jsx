import styles from './../styles/Game.module.scss';
import { ButtonReset } from './Buttons';
import { assets } from '../assets/Assets';
import React from 'react';

// prettier-ignore
const x = (<svg className={styles.x} width="64" height="64" xmlns="http://www.w3.org/2000/svg">{assets.path_x}</svg>);
// prettier-ignore
const o = (<svg className={styles.o} width="64" height="64" xmlns="http://www.w3.org/2000/svg">{assets.path_o}</svg>);

const Game = function (props) {
    console.log(props.gameState);
    const [gameState, setGameState] = React.useState();

    const setActive = ({ target }) => {
        if (target.closest('img') || target.querySelector('img').src) return;

        let img = target.querySelector('img');
        img.classList.add(styles.mark);
        img.classList.remove(styles.mark_initial);

        img.src = assets.icon_x;
        target.dataset.mark = 'x';
    };

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <img className={styles.logo} src={assets.logo} alt="" />
                <div className={styles.middleBox}>
                    {x}
                    <p>Turn</p>
                </div>
                <ButtonReset icon={assets.icon_restart} />
            </header>

            <div className={styles.wrapper}>
                <div className={styles.box} onClick={setActive}>
                    <img className={styles.mark_initial} alt="" />
                </div>

                <div className={styles.box} onClick={setActive}>
                    <img className={styles.mark_initial} alt="" />
                </div>

                <div className={styles.box} onClick={setActive}>
                    <img className={styles.mark_initial} alt="" />
                </div>

                <div className={styles.box} onClick={setActive}>
                    <img className={styles.mark_initial} alt="" />
                </div>

                <div className={styles.box} onClick={setActive}>
                    <img className={styles.mark_initial} alt="" />
                </div>

                <div className={styles.box} onClick={setActive}>
                    <img className={styles.mark_initial} alt="" />
                </div>

                <div className={styles.box} onClick={setActive}>
                    <img className={styles.mark_initial} alt="" />
                </div>

                <div className={styles.box} onClick={setActive}>
                    <img className={styles.mark_initial} alt="" />
                </div>

                <div className={styles.box} onClick={setActive}>
                    <img className={styles.mark_initial} alt="" />
                </div>
            </div>

            <footer className={styles.footer}>
                <div className={`${styles.total_x} ${styles.total}`}>
                    <p className={styles.title}>X (P2)</p>
                    <p className={styles.score}>14</p>
                </div>

                <div className={`${styles.total_ties} ${styles.total}`}>
                    <p className={styles.title}>Ties</p>
                    <p className={styles.score}>32</p>
                </div>

                <div className={`${styles.total_o} ${styles.total}`}>
                    <p className={styles.title}>O (P1)</p>
                    <p className={styles.score}>11</p>
                </div>
            </footer>
        </section>
    );
};

export default Game;

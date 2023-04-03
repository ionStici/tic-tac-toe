import { ButtonMain } from './Buttons';
import styles from './NewGame.module.scss';
import { useState } from 'react';

// prettier-ignore
export const x = (<svg className={styles.x} width="64" height="64" xmlns="http://www.w3.org/2000/svg" ><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fillRule="evenodd" /></svg>);
// prettier-ignore
export const o = (<svg className={styles.o} width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>);

const NewGame = function (props) {
    const [mark, setMark] = useState('x');

    const switchMark = function ({ target }) {
        document
            .querySelectorAll(`.${styles.box}`)
            .forEach(box => box.classList.remove(styles.active));

        target.closest(`.${styles.box}`).classList.add(styles.active);
        setMark(target.closest(`.${styles.box}`).dataset.mark);
    };

    const startNewGame = ({ target }) => {
        props.startNewGame(target.dataset.mode, mark);
    };

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <img className={styles.logo} src={props.logo} alt="Logo" />
            </header>

            <div className={styles.panel}>
                <p className={styles.title}>Pick Player 1's Mark</p>

                <div className={styles.wrapper}>
                    <div
                        className={`${styles.box} ${styles.active}`}
                        data-mark="x"
                        onClick={switchMark}
                    >
                        {x}
                    </div>
                    <div
                        className={styles.box}
                        data-mark="o"
                        onClick={switchMark}
                    >
                        {o}
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

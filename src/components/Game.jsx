import styles from './Game.module.scss';
import { ButtonReset } from './Buttons';
import { x, o } from './NewGame';

const Game = function (props) {
    let player = '2';

    const setActive = ({ target }) => {
        if (target.closest('img') || target.querySelector('img').src) return;

        let img = target.querySelector('img');
        img.classList.add(styles.mark);
        img.classList.remove(styles.mark_initial);

        img.src = player === '1' ? props.icon_x : props.icon_o;
        target.dataset.mark = player === '1' ? 'x' : 'o';
    };

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <img className={styles.logo} src={props.logo} alt="" />
                <div className={styles.middleBox}>
                    {o}
                    <p>Turn</p>
                </div>
                <ButtonReset icon={props.restart} />
            </header>

            <div className={styles.wrapper}>
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

import styles from './../styles/Prompt.module.scss';
import { ButtonSecond } from './Buttons';

const Prompt = function (props) {
    const winner_x = { color: 'var(--color-light-blue)' };
    const winner_o = { color: 'var(--color-light-yellow)' };

    return (
        <>
            <div className={styles.layout}></div>
            <section className={styles.section}>
                <div className={styles.container}>
                    <p className={styles.message}>{props.message}</p>

                    <div className={styles.title_box}>
                        <img className={styles.icon} src={props.icon} alt="" />
                        <h2
                            className={styles.title}
                            style={props.winner === 'x' ? winner_x : winner_o}
                        >
                            {props.title}
                        </h2>
                    </div>

                    <div className={styles.button_box}>
                        <ButtonSecond
                            color="silver"
                            text={props.cancel_text}
                            onClick={
                                props.type === 'restart'
                                    ? props.cancel_event
                                    : props.quit_event
                            }
                        />
                        <ButtonSecond
                            color="yellow"
                            text={props.restart_text}
                            onClick={
                                props.type === 'restart'
                                    ? props.restart_event
                                    : props.next_event
                            }
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Prompt;

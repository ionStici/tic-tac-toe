import styles from './../styles/Prompt.module.scss';
import { ButtonSecond } from './Buttons';

const Prompt = function (props) {
    let color;
    if (props.winner === 'x') color = { color: 'var(--color-light-blue)' };
    if (props.winner === 'o') color = { color: 'var(--color-light-yellow)' };

    return (
        <>
            <div className={styles.layout}></div>
            <section className={styles.section}>
                <div className={styles.container}>
                    {props.message ? (
                        <p className={styles.message}>{props.message}</p>
                    ) : (
                        ''
                    )}

                    <div className={styles.title_box}>
                        {props.icon ? (
                            <img
                                className={styles.icon}
                                src={props.icon}
                                alt=""
                            />
                        ) : (
                            ''
                        )}

                        <h2 className={styles.title} style={color}>
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

import styles from './../styles/Prompt.module.scss';
import { ButtonSecond } from './Buttons';

const Prompt = function (props) {
    return (
        <>
            <div className={styles.layout}></div>
            <section className={styles.section}>
                <div className={styles.container}>
                    <p className={styles.message}>{props.message}</p>

                    <div className={styles.title_box}>
                        <img className={styles.icon} src={''} alt="" />
                        <h2 className={styles.title}>{props.title}</h2>
                    </div>

                    <div className={styles.button_box}>
                        <ButtonSecond
                            color="silver"
                            text={props.cancel_text}
                            onClick={props.cancel_event}
                        />
                        <ButtonSecond
                            color="yellow"
                            text={props.restart_text}
                            onClick={props.restart_event}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Prompt;

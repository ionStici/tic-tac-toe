import styles from './../styles/Prompt.module.scss';
import { ButtonSecond } from './Buttons';

const Prompt = function (props) {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.container}>
                    <p>{props.message}</p>
                    <h2>{props.title}</h2>
                    <div className={styles.button_box}>
                        <ButtonSecond
                            color="silver"
                            text={props.cancel}
                            onClick={''}
                        />
                        <ButtonSecond
                            color="yellow"
                            text={props.restart}
                            onClick={props.restart_event}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Prompt;

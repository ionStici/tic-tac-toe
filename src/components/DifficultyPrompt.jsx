import styles from './../styles/Prompt.module.scss';
import { ButtonSecond } from './Buttons';

const DifficultyPrompt = function (props) {
    return (
        <>
            <div className={styles.layout} onClick={props.closePrompt}></div>
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.title_box}>
                        <h2 className={styles.title}>{props.title}</h2>
                    </div>

                    <div className={styles.button_box}>
                        <ButtonSecond
                            color="silver"
                            text="Easy"
                            onClick={props.easyEvent}
                        />
                        <ButtonSecond
                            color="silver"
                            text="Normal"
                            onClick={props.normEvent}
                        />
                        <ButtonSecond
                            color="silver"
                            text="Hard"
                            onClick={props.hardEvent}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default DifficultyPrompt;

import { ButtonSecond } from './Buttons';
import styles from './Prompt.module.scss';

const Prompt = function () {
    return (
        <>
            <ButtonSecond text="Quit" color="silver" />
            <ButtonSecond text="Next Round" color="yellow" />
            <ButtonSecond text="No, Cancel" color="silver" />
            <ButtonSecond text="Yes, Restart" color="yellow" />
        </>
    );
};

export default Prompt;

import styles from './Buttons.module.scss';

// // // // // // // // // // // // // // //

const ButtonMain = function (props) {
    return (
        <button
            onClick={props.handleClick}
            // prettier-ignore
            className={`${styles.btn_main} ${props.color === 'yellow' ? styles.btn_main_yellow : ''} ${props.color === 'blue' ? styles.btn_main_blue : ''}`}
            // prettier-ignore
            data-mode={`${props.color === 'yellow' ? '1' : ''}${props.color === 'blue' ? '2' : ''}`}
        >
            {props.text}
        </button>
    );
};

// // // // // // // // // // // // // // //

const ButtonSecond = function (props) {
    return (
        <button
            // prettier-ignore
            className={`
                ${styles.btn_second}
                ${props.color === 'silver' ? styles.btn_second_silver : ''}
                ${props.color === 'yellow' ? styles.btn_second_yellow : ''}
            `}
        >
            {props.text}
        </button>
    );
};

// // // // // // // // // // // // // // //

const ButtonReset = function (props) {
    return (
        <div className={`${styles.btn_reset}`} role="button" aria-label="Reset">
            <img src={props.icon} alt="Reset" />
        </div>
    );
};

// // // // // // // // // // // // // // //

export { ButtonMain, ButtonSecond, ButtonReset };

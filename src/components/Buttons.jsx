import styles from "./../styles/Buttons.module.scss";
import { assets } from "../assets/Assets";

const ButtonMain = function ({ text, handleClick, color }) {
  return (
    <button
      onClick={handleClick}
      className={`${styles.btn_main} 
      ${color === "yellow" ? styles.btn_main_yellow : ""} 
      ${color === "blue" ? styles.btn_main_blue : ""}`}
      data-mode={`${color === "yellow" ? "1" : ""}${color === "blue" ? "2" : ""}`}
    >
      {text}
    </button>
  );
};

const ButtonSecond = function ({ text, color, onClick }) {
  return (
    <button
      className={`${styles.btn_second} 
      ${color === "silver" ? styles.btn_second_silver : ""} 
      ${color === "yellow" ? styles.btn_second_yellow : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const ButtonReset = function ({ onClick }) {
  return (
    <div className={`${styles.btn_reset}`} onClick={onClick} role="button" aria-label="Reset">
      <img src={assets.icon_restart} alt="Reset" />
    </div>
  );
};

export { ButtonMain, ButtonSecond, ButtonReset };

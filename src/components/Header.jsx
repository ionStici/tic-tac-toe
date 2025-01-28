import styles from "./../styles/Game.module.scss";
import { ButtonReset } from "./Buttons";
import { assets } from "../assets/Assets";

export function Header({ handle_restart }) {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={assets.logo} alt="" />
      <div className={styles.middleBox}>
        <svg
          className={`${styles.turn_mark} ${styles.turn_mark_x}`}
          width="64"
          height="64"
          xmlns="http://www.w3.org/2000/svg"
        >
          {assets.path_x}
        </svg>

        <svg
          className={`${styles.turn_mark} ${styles.turn_mark_o} ${styles.turn_mark_fade_out}`}
          width="64"
          height="64"
          xmlns="http://www.w3.org/2000/svg"
        >
          {assets.path_o}
        </svg>

        <p>Turn</p>
      </div>
      <ButtonReset onClick={handle_restart} />
    </header>
  );
}

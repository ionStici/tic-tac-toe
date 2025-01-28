import styles from "./../styles/Game.module.scss";
import { assets } from "../assets/Assets";

export function Tile({ numbers, setActive, onHover, leaveHover }) {
  return (
    <div
      className={`${styles.box} ${numbers}`}
      onClick={setActive}
      onMouseOver={onHover}
      onMouseOut={leaveHover}
      data-mark=""
    >
      <img className={styles.mark_hover} src={undefined} alt="" />

      <svg
        className={`${styles.mark} ${styles.mark_x}`}
        width="64"
        height="64"
        xmlns="http://www.w3.org/2000/svg"
      >
        {assets.path_x}
      </svg>

      <svg
        className={`${styles.mark} ${styles.mark_o}`}
        width="64"
        height="64"
        xmlns="http://www.w3.org/2000/svg"
      >
        {assets.path_o}
      </svg>
    </div>
  );
}

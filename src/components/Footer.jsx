import styles from "./../styles/Game.module.scss";

export default function Footer({ player1, score_x, score_o, score_ties }) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.total_x} ${styles.total}`}>
        <p className={styles.title}>X ({player1 === "x" ? "P1" : "P2"})</p>
        <p className={styles.score}>{score_x}</p>
      </div>

      <div className={`${styles.total_ties} ${styles.total}`}>
        <p className={styles.title}>Ties</p>
        <p className={styles.score}>{score_ties}</p>
      </div>

      <div className={`${styles.total_o} ${styles.total}`}>
        <p className={styles.title}>O ({player1 === "x" ? "P2" : "P1"})</p>
        <p className={styles.score}>{score_o}</p>
      </div>
    </footer>
  );
}

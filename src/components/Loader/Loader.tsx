import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.hourglassBackground}>
      {/*  From Uiverse.io by SouravBandyopadhyay  */}
      <div className={styles.hourglassContainer}>
        <div className={styles.hourglassCurves}></div>
        <div className={styles.hourglassCapTop}></div>
        <div className={styles.hourglassGlassTop}></div>
        <div className={styles.hourglassSand}></div>
        <div className={styles.hourglassSandStream}></div>
        <div className={styles.hourglassCapBottom}></div>
        <div className={styles.hourglassGlass}></div>
      </div>
    </div>
  );
}

export default Loader;

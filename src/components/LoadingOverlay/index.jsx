import styles from './style.module.scss';

const LoadingOverlay = () => (
  <div className={styles.overlay}>
    <div className={styles.loadingMessage}>Getting new artwork</div>
  </div>
);

export default LoadingOverlay;
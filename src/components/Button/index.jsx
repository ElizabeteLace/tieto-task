import styles from './style.module.scss';

const Button = ({ onClick, disabled, children}) => (
    <button 
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  );

export default Button;
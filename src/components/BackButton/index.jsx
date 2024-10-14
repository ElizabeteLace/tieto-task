import Link from 'next/link';
import styles from './style.module.scss';

const BackButton = ({ text }) => {
  return (
    <div className={styles.artworkContainer}>
    <Link href="/">
          <div className={styles.navigation}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-left"
            >
              <path d="M6 8L2 12L6 16" />
              <path d="M2 12H22" />
            </svg>
            <p>{text}</p>
          </div>
        </Link>
    </div>
  );
};

export default BackButton;
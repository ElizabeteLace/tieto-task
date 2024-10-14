import Link from 'next/link';
import styles from './style.module.scss';

const ArtworkItem = ({ art, onImageLoad }) => {
  return (
    <div className={styles.artworkContainer}>
      <Link href={`/art/${art.objectNumber}`}>
        <img
          src={art?.webImage?.url}
          alt={art.title}
          onLoad={onImageLoad}
        />
      </Link>
      <span className={styles.title}>{art.title}</span>
    </div>
  );
};

export default ArtworkItem;
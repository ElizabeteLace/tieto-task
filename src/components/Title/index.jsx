import PropTypes from 'prop-types';
import styles from './style.module.scss';

const Title = ({ as: Tag = 'h1', size = 'medium', children }) => {
  return (
    <Tag className={`${styles.title} ${styles[size]}`}>
      {children}
    </Tag>
  );
};

Title.propTypes = {
  as: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Title;


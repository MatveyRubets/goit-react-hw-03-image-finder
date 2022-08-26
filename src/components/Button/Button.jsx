import PropTypes from 'prop-types';
import style from './Button.module.css';

const Button = ({ onShowMore }) => {
  return (
    <div className={style.Container}>
      <button type="button" className={style.Button} onClick={onShowMore}>
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  onShowMore: PropTypes.func.isRequired,
};

export default Button;

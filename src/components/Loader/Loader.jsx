import { Oval } from 'react-loader-spinner';
import style from './Loader.module.css';

const Loader = () => {
  return (
    <div className={style.Container}>
      <Oval color="#FF8066" />
    </div>
  );
};

export default Loader;

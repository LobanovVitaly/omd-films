import style from './Preloader.module.css';
import image from '../../../assets/img/loader.gif'


const Preloader = () => {
    return (
        <img src={image} className={style.preloader} />
    );
}

export default Preloader;
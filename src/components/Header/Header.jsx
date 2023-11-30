import commonStyle from '../../assets/css/common.module.css';
import style from './Header.module.css'

const Header = (props) => {
    return (
        <header className={style.header}>
            <div className={commonStyle.container}>
                <span className={style.logoText}>The Open Movie Database</span>
            </div>
        </header>
    );
}

export default Header;
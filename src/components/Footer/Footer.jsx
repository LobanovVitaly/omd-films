import commonStyle from "../../assets/css/common.module.css";
import style from "./Footer.module.css";

const Footer = (props) => {
    return (
        <footer className={style.footer}>
            <div className={commonStyle.container}>
                <p>API by Brian Fritz.</p>
                <p> All content licensed under CC BY-NC 4.0.</p>
                <p>This site is not endorsed by or affiliated with IMDb.com.</p>
            </div>
        </footer>
    );
}

export default Footer;
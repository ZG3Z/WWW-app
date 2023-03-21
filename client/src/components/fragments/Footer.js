import { useTranslation } from 'react-i18next';

function Footer() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    };

    return (
        <div>        
            <nav>
                <ul>
                    <li>
                        <button type="button" onClick={() => changeLanguage('pl')}>PL</button>
                        <button type="button" onClick={() => changeLanguage('en')}>EN</button>
                    </li>
                </ul>
            </nav>
            <footer>
                Zuzanna Gez - s23570
            </footer>
        </div>
    )
}

export default Footer;
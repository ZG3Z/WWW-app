import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAuthenticated  } from '../../helpers/authHelper';

function Navigation({ handleLogout }) {
    const { t } = useTranslation();
    const loginLogoutLink = isAuthenticated() ?<button onClick={handleLogout}>{t('form.actions.logout')}</button> : <Link to="/login">{t('form.actions.login')}</Link>;

    return (
        <nav>
            <ul>
                <li><Link to="/">{t('nav.main-page')}</Link></li>
                <li><Link to="/customers">{t('nav.customers')}</Link></li>
                <li><Link to="/bikes">{t('nav.bikes')}</Link></li>
                <li><Link to="/accessories">{t('nav.accessories')}</Link></li>
                {isAuthenticated() &&
                <li><Link to="/rentals">{t('nav.rentals')}</Link></li>
                }
                <li className='lang'>{loginLogoutLink}</li>
            </ul>
        </nav>
    )
}

export default Navigation;
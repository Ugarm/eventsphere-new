import { useState, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { AuthentificationUserContext } from "../../authentification/user/stores/user/AuthentificationUserProvider";
import styles from "./navbar.module.scss";
import logo from "../../../../src/images/logo.webp"; // Adjust path accordingly

const NavBar = () => {
    const [navIsOpen, setNavIsOpen] = useState(false);
    const { isAuthentificated, logout } = useContext(AuthentificationUserContext);
    const location = useLocation();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            logout();
        }
    };

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        // Implement language change logic here
    };
    console.log(isAuthentificated )
    return (
        <div className={styles.containerNavbar}>
            <div className={styles.containerNavbarLogo}>
                <Link className={styles.logoLink} to="/">
                    <div className={styles.logoContainer}>
                        <img className={styles.logoContainerImage} src={logo} alt="Event Sphere" />
                        <h1 className={styles.logoContainerTitle}>Event Sphere</h1>
                    </div>
                </Link>
            </div>
            <div
                onClick={() => setNavIsOpen(prevState => !prevState)}
                className={styles.containerBurger}
                aria-label={navIsOpen ? "Close navigation" : "Open navigation"}
                role="button"
            >
                {!navIsOpen ? <GiHamburgerMenu size="2rem" /> : <IoClose size="2rem" />}
            </div>
            <nav className={navIsOpen ? `${styles.containerNavbarLinks} ${styles.containerNavbarLinksActive}` : styles.containerNavbarLinks}>
                <select className={styles.languageSelector} onChange={handleLanguageChange}>
                    <option className={styles.french} value="fr">Français</option>
                    <option className={styles.english} value="en">English</option>
                </select>
                <Link className={`${styles.navLink} ${location.pathname === '/meetups' ? styles.active : ''}`} to="/meetups">Événements</Link>
                {!isAuthentificated && (
                    <>
                        <Link className={`${styles.navLink} ${location.pathname === '/register' ? styles.active : ''}`} to="/register">Inscription</Link>
                        <Link className={`${styles.navLink} ${location.pathname === '/login' ? styles.active : ''}`} to="/login">Connexion</Link>
                    </>
                )}
                {isAuthentificated && (
                    <button className={styles.navLink} onClick={handleLogout}>Déconnexion</button>
                )}
            </nav>
        </div>
    );
};

export default NavBar;

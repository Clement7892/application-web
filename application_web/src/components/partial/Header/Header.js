import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../icons/home.svg";
import { ReactComponent as ProductsIcon } from "../icons/box.svg";
import { ReactComponent as RegisterIcon } from "../icons/user-plus.svg";
import { ReactComponent as LoginIcon } from "../icons/log-in.svg";
import "./Header.css";

function Header() {
  return (
    <header className="App-header">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <HomeIcon />
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/">
              <ProductsIcon />
              Nos produits
            </Link>
          </li>
          <li>
            <Link to="/register">
              <RegisterIcon />
              Inscription
            </Link>
          </li>
          <li>
            <Link to="/login">
              <LoginIcon />
              Connexion
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

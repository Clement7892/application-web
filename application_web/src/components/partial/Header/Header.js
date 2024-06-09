import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="App-header">
      <nav>
        <ul>
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/">Nos produits</a>
          </li>
          <li>
            <Link to="/register">Inscription</Link>
          </li>
          <li>
            <Link to="/login">Connexion</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

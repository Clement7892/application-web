import { Link } from "react-router-dom";
import "./HeaderLogin.css";

function HeaderLogin() {
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
            <a href="/">À propos</a>
          </li>
          <li>
            <Link to="/forum">Forum</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderLogin;

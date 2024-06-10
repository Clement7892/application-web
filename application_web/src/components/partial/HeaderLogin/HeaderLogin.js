import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../../icons/home.svg";
import { ReactComponent as ProductsIcon } from "../../../icons/box.svg";
import { ReactComponent as HistoryIcon } from "../../../icons/history.svg";
import { ReactComponent as ForumIcon } from "../../../icons/forum.svg";

import "./HeaderLogin.css";

function HeaderLogin() {
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
            <Link to="/product">
              <ProductsIcon />
              Nos produits
            </Link>
          </li>
          <li>
            <Link to="/propos">
              <HistoryIcon />
              History
            </Link>
          </li>
          <li>
            <Link to="/forum">
              <ForumIcon />
              Forum
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderLogin;

import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { useContext } from "react";
import "../styles/Header.css";

const Header = () => {
    const { user } = useContext(UserContext);

    return(
        <header className="header">
            <Link className="header__h1" to="/"><h1>NC Games</h1></Link>
            <p className="header__welcome">Welcome, { user }</p>
        </header>
    )
}

export default Header
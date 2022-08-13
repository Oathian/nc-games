import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { useContext } from "react";
import "../styles/Header.css";

const Header = ({ setUser }) => {
    const { user } = useContext(UserContext);
    
    const handleSignOut = () => {
        setUser(undefined);
    };
    
    return(
        <header className="header">
            <Link className="header__h1" to="/"><h1>NC Games</h1></Link>
            {user?<div className="header__div"><p className="header__welcome">Welcome, { user.username }</p><button className="header__signout" onClick={handleSignOut}>Sign Out</button></div>:<div className="header__signdiv"><Link className="header__sign" to="/sign-in"><h3 className="header__h3">Sign in or sign up</h3></Link></div>}
        </header>
    )
}

export default Header
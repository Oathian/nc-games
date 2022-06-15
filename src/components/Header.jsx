import { Link } from "react-router-dom";

const Header = () => {
    return(
        <header className="header">
            <Link className="header__h1" to="/"><h1>NC Games</h1></Link>
        </header>
    )
}

export default Header
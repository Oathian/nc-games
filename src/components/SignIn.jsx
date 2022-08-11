import { useState } from "react";
import  { getUserByUsername, postUser }  from "../utils/api";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import '../styles/SignIn.css';

const SignIn = ({ setUser }) => {
    const [toggleSign, setToggleSign] = useState("Sign In");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [avatar_url, setAvatar_url] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = (event) => {
        event.preventDefault();
        getUserByUsername(event.target[0].value)
        .then((user) => {
            setUser(user);
            setUsername("");
            navigate("../");
        }).catch((error) => {
            setError(error);
        });
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        postUser(event.target[0].value, event.target[1].value, event.target[2].value).then((user) => {
            console.log(user)
            setUser(user);
            navigate("../");
        }).catch((error) => {
            setError(error);
        });
    };

    const handleToggle = () => {
        if( toggleSign === "Sign In" ) {
            setToggleSign("Sign Up");
            setUsername("");
            setName("");
            setAvatar_url("");
            setError(null);
        }else{
            setToggleSign("Sign In");
            setUsername("");
            setError(null);
        };
    };

    return (
        <section className="signPage">
            <section className="signBox">
            <button className="signToggle" onClick={handleToggle}>{toggleSign === "Sign In"?"Sign Up":"Sign In"}</button>
            {toggleSign==="Sign In"?<form className="signForm" onSubmit={handleSignIn}>
                <h3 className="signTitle">Sign In</h3>
                {error?<ErrorComponent error={error}/>:<></>}
                <label htmlFor="username">Username:</label>
                <input className="signInput" value={username} onChange={(event) => setUsername(event.target.value)} id="username"></input>
                <button className="signButton" type="sumbit">Submit</button>
            </form>:<form className="signForm" onSubmit={handleSignUp}>
                <h3 className="signTitle">Sign Up</h3>
                {error?<ErrorComponent error={error}/>:<></>}
                <label htmlFor="username">Username:</label>
                <input className="signInput" value={username} onChange={(event) => setUsername(event.target.value)} id="username"></input>
                <label htmlFor="name">First Name:</label>
                <input className="signInput" value={name} onChange={(event) => setName(event.target.value)} id="name"></input>
                <label htmlFor="avatar_url">Avatar Url:</label>
                <input className="signInput" value={avatar_url} onChange={(event) => setAvatar_url(event.target.value)} id="avatar_url"></input>
                <button className="signButton" type="sumbit">Submit</button>
            </form>}
            </section>
        </section>)
};

export default SignIn;
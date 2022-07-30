import { useState } from "react";
import  { getUserByUsername }  from "../utils/api";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";

const SignIn = ({ setUser }) => {
    const [toggleSign, setToggleSign] = useState("Sign In");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = (event) => {
        event.preventDefault();
        getUserByUsername(event.target[0].value)
        .then((user) => {
            setUser(user);
            navigate("../")
        }).catch((error) => {
            setError(error);
        });
    };

    const handleSignUp = () => {

    };

    const handleToggle = () => {
        if( toggleSign === "Sign In" ) {
            setToggleSign("Sign Up");
            setError(null);
        }else{
            setToggleSign("Sign In");
            setError(null);
        };
    };

    return (
        <section>
            <button onClick={handleToggle}>{toggleSign === "Sign In"?"Sign Up":"Sign In"}</button>
            {toggleSign==="Sign In"?<form onSubmit={handleSignIn}>
                <h3>Sign In</h3>
                {error?<ErrorComponent error={error}/>:<></>}
                <label htmlFor="username">Username:</label>
                <input id="username"></input>
                <button type="sumbit">Submit</button>
            </form>:<form onSubmit={handleSignUp}>
                <h3>Sign Up</h3>
                {error?<ErrorComponent error={error}/>:<></>}
                <label htmlFor="username">Username:</label>
                <input id="username"></input>
                <label htmlFor="name">First Name:</label>
                <input id="name"></input>
                <label htmlFor="avatar_url">Avatar Url:</label>
                <input id="avatar_url"></input>
                <button type="sumbit">Submit</button>
            </form>}
        </section>)
};

export default SignIn;
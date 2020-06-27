import React from "react"
import Auth from "./Auth"
export function User(props) {
    return (<div>
        <h2>Login</h2>
        {
            Auth.isAuthenticate() ?
                <h2>Wellcome {Auth.getName()}</h2>
                :
                <button onClick={() => { toLogin(props) }}>Login</button>
        }
    </div>
    );
}
function toLogin(props) {
    Auth.login(() => {
        props.history.push('/');
    }, (mess) => {
        alert(mess);
        props.history.push('/user');
    });
}
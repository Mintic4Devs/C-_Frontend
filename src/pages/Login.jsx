import React, { useState } from "react";
import {gql, useMutation} from '@apollo/client'
import { useHistory } from "react-router-dom";
import classes from './styles/Register.module.scss'
import { useSnackbar } from 'notistack';

const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login (
      email: $email
      password: $password
    ) {
      token
    }
  }`

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [ loginUser ] = useMutation(LOGIN_USER)

    const handleSubmit = (event) => {

        loginUser({ variables: { email, password } }).then(res => {
          if (res.data.login === null){
            enqueueSnackbar( "Email o contraseña incorrecta", { variant: 'error' });
          }else{
            localStorage.setItem("token", res.data.login.token);
          }
        })
        event.preventDefault();
        history.push("/");
      }

    return (

        <form onSubmit={handleSubmit} className={classes.form}>
            <h1>Ingresar</h1>

            <label>
                Email:
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required />
            </label>

            <label>
                Password:
                <input
                    name="password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    required />
            </label>

            <button>Login</button>
        </form>
    )
};

export default Login;
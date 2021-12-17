import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client'
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';

import classes from './styles/Register.module.scss'

const CREATE_USER = gql`
mutation createUser($name: String!, $lastname: String!, $dni: String!, $email: String!, $role: Enum_Role!, $password: String!) {
    createUser (
      name: $name
      lastname: $lastname
      dni: $dni
      email: $email
      role: $role
      password: $password
    ) {
      name
      lastname
      dni
      state
      role
    }
  }`

const Register = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [dni, setDNI] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [createUser] = useMutation(CREATE_USER)

  const handleSubmit = (event) => {

    createUser({ variables: { name, lastname, dni, email, role, password } }).then(res => {
      console.log(res.data)
      enqueueSnackbar("Registered used", { variant: 'success' });
      history.push("/");     
    }).catch(err => {
      enqueueSnackbar(err.message, { variant: 'error' });
    })
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h1>Registrarse</h1>
      <br></br>
      <label>
        Nombre:
        <input
          name="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required />
      </label>

      <label>
        Apellido:
        <input
          name="lastname"
          type="text"
          value={lastname}
          onChange={e => setLastname(e.target.value)}
          required />
      </label>

      <label>
        DNI:
        <input
          name="dni"
          type="number"
          value={dni}
          onChange={e => setDNI(e.target.value)}
          required />
      </label>

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
        Rol:
        <select
          name="role"
          value={role}
          onChange={e => setRole(e.target.value)}
          required>
          <option key=""></option>
          <option key="admin">Administrador</option>
          <option key="leader">Lider</option>
          <option key="student">Estudiante</option>
        </select>
      </label>

      <label>
        Password:
        <input
          name="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          required />
      </label>

      <button>Register</button>
    </form>
  );
};

export default Register;
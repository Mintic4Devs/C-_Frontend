import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client'
import { useHistory } from "react-router-dom";

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

const Register = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [dni, setDNI] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const [createUser] = useMutation(CREATE_USER)

  const handleSubmit = (event) => {

    createUser({ variables: { name, lastname, dni, email, role, password } })
    console.log(`
          Name: ${name}
          Lastname: ${lastname}
          DNI: ${dni}
          Role: ${role}
          Password: ${password}
        `);

    event.preventDefault();
    history.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h1>Crear usuario</h1>

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
          <option key="admin">ADMINISTRATOR</option>
          <option key="leader">LEADER</option>
          <option key="student">STUDENT</option>
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
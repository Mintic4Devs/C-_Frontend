import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client'
import { useHistory } from "react-router-dom";
import classes from './styles/Register.module.scss'
import { useSnackbar } from 'notistack';

const CREATE_PROJECT = gql`
mutation createProject($name: String!, $budget: Float!,  $date_init: Date!, $date_init: Date!, $leader: User!) {
  createProject (
    name: "Proyecto 5"
    budget: 210000
    date_init: "2021-12-10"
    date_end: "2022-01-01"
    leader: "61b99802d2ca17fbba109175"
    ) {
      name
      phase
      state
    }
  }`

const Project = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [date_init, setDateInit] = useState('');
  const [date_end, setDateEnd] = useState('');
  const [leader, setLeader] = useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [createProject] = useMutation(CREATE_PROJECT)

  const handleSubmit = (event) => {

    createProject({ variables: { name, budget, date_init, date_end, leader } }).then(res => {
      console.log(res.data)
      enqueueSnackbar("Registered Project", { variant: 'success' });
      history.push("/");     
    }).catch(err => {
      enqueueSnackbar(err.message, { variant: 'error' });
    })
    event.preventDefault();
  }

  return (

    <form onSubmit={handleSubmit} className={classes.form}>
      <h1>Proyectos</h1>
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
        Presupuesto:
        <input
          name="budget"
          type="number"
          value={budget}
          onChange={e => setBudget(e.target.value)}
          required />
      </label>

      <label>
        Fecha de inicio:
        <input
          name="date_init"
          type="date"
          value={date_init}
          onChange={e => setDateInit(e.target.value)}
          required />
      </label>

      <label>
        Fecha final:
        <input
          name="date_end"
          type="date"
          value={date_end}
          onChange={e => setDateEnd(e.target.value)}
          required />
      </label>

      <label>
        Lider:
        <input
          name="leader"
          type="text"
          value={leader}
          onChange={e => setLeader(e.target.value)}
          required />
      </label>

      <button>Crear proyecto</button>
    </form>
  )
};

export default Project;
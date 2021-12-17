import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client'
import { useHistory } from "react-router-dom";
import classes from './styles/Register.module.scss'
import { useSnackbar } from 'notistack';

const CREATE_PROJECT = gql`
mutation createProject($name: String!, $budget: String!,  $date_init: Date!, $date_end: Date!, $leader: String!, $state: Enum_StateProject!, $phase: Enum_PhaseProject! ) {
  createProject (
    name: $name
    budget: $budget
    date_init: $date_init
    date_end: $date_end
    leader: $leader
    state: $state
    phase: $phase
    ) {
      name
    }
  }`

const Project = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [date_init, setDateInit] = useState('');
  const [date_end, setDateEnd] = useState('');
  const [leader, setLeader] = useState("");
  const [state, setState] = useState("");
  const [phase, setPhase] = useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [createProject] = useMutation(CREATE_PROJECT)

  const handleSubmit = (event) => {

    createProject({ variables: { name, budget, date_init, date_end, leader, state, phase } }).then(res => {
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
          type="text"
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

      <label>
        Estado:
        <select
          name="state"
          value={state}
          onChange={e => setState(e.target.value)}
          required>
          <option key=""></option>
          <option key="active">ACTIVE</option>
          <option key="inactive">INACTIVE</option>
        </select>
      </label>

      <label>
        Fase:
        <select
          name="phase"
          value={phase}
          onChange={e => setPhase(e.target.value)}
          required>
          <option key=""></option>
          <option key="initiated">INITIATED</option>
          <option key="developing">DEVELOPING</option>
          <option key="finished">FINISHED</option>
          <option key="null">NULL</option>
        </select>
      </label>

      <button>Crear proyecto</button>
    </form>
  )
};

export default Project;
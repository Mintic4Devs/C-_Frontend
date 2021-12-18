import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
query readUsers {
  Users {
    _id
    name
    lastname
    dni
    email
    state
    role
    inscriptions {
      _id
    }
    ledProject {
      budget
    }
  }
}`

const Leaders = ({leader, setLeader}) => {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  const users = data.Users.filter(user => user.role === 'LEADER')

  return (
    <div>
      <select
      name="leader"
      value={leader}
      onChange={e => setLeader(e.target.value)}>
         <option key=''></option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Leaders;
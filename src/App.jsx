import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({
    name: "",
    age: null,
    isMarried: false,
  });
  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USERS);
  const { data: getUserByIdData, loading: getUserByIdLoading } = useQuery(
    GET_USER_BY_ID,
    {
      variables: {
        id: "2",
      },
    }
  );
  const [createUser] = useMutation(CREATE_USER);
  const handleCreateUser = async () => {
    createUser({ variables: { ...newUser, age: Number(newUser.age) } });
  };
  if (getUsersLoading) return <p>Data loading...</p>;
  if (getUsersError) return <p>Error fetching data: {getUsersError.message}</p>;
  return (
    <>
      <div>
        <input
          placeholder="Name"
          onChange={(evt) =>
            setNewUser((currUser) => ({ ...currUser, name: evt.target.value }))
          }
        />
        <input
          placeholder="Age"
          type="number"
          onChange={(evt) =>
            setNewUser((currUser) => ({ ...currUser, age: evt.target.value }))
          }
        />
        <button onClick={() => handleCreateUser()}>Create User</button>
      </div>
      <div>
        {getUserByIdLoading ? (
          <p>Loading chosen user...</p>
        ) : (
          <div>
            <h1>Chosen User:</h1>
            <p>{getUserByIdData.getUserById.name}</p>
            <p>{getUserByIdData.getUserById.age}</p>
          </div>
        )}
      </div>
      <h1>Users</h1>
      <div>
        {getUsersData.getUsers.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Is Married: {user.isMarried.toString()}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

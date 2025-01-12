import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

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

function App() {
  const { data, error, loading } = useQuery(GET_USERS);
  if (loading) return <p>Data loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  return (
    <>
      <h1>Users</h1>
      <div>
        {data.getUsers.map((user) => (
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

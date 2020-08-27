import React, {useState} from 'react';
import Axios from "axios";
import { useEffect } from 'react';

export default function Home(props) {

  const [users, setUsers] = useState([]);

  async function getUsers() {
    try {
      let res = await Axios.get("http://localhost:3010/users/index");
      console.log(res.data);
      setUsers(res.data.users);
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUsers();
  }, [setUsers])

  return (
    <div>
      <h1>USER INDEX</h1>
      {users.map((user) => {
        return <li>{user.username}</li>;
      })}
    </div>
  );
}
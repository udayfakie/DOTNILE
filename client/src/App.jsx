import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    
    } catch (error) {
      console.error(error);
    }
  };
  console.log(users);
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {users.map((user, i) => {
        return (
          <div key={i}>
            <ul>
              <li>{user.name}</li>
              <li>{user.age}</li>
              <li>{user.email}</li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default App;

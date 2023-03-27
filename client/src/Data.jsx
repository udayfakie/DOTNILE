import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import styled from "styled-components";

const Data = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const BASE_URL = "http://localhost:3001";

  const refreshData = async () => {
    try {
      const response = await Axios.get(`${BASE_URL}/users`);
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetData = async () => {
    try {
      const response = await Axios.get(`${BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  GetData();

  useEffect(() => {
    return () => {
      refreshData();
    };
  }, []);

  const CreateUser = async () => {
    try {
      const response = await Axios.post(`${BASE_URL}/createUser`, {
        name,
        age,
        email,
      });
      setUsers([...users, response.data]);
      console.log(response.data);
      refreshData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`${BASE_URL}/${id}`);
      console.log(response.data);
      console.log("deleted");
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      refreshData();
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <Container>
      <INPUT
        type="text "
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <INPUT
        type="number"
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
      />
      <INPUT
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <BUTTON onClick={CreateUser}> Create User</BUTTON>
      {users.map((user, index) => {
        const { _id, name, age, email } = user;
        return (
          <DisplayItems key={index}>
            <Ul>
              <LI>Name: {name}</LI>
              <LI>Age: {age}</LI>
              <LI>Email: {email}</LI>
            </Ul>
            <BUTTON_del onClick={() => handleDelete(_id)}>del</BUTTON_del>
            <BUTTON_edit onClick={() => handleEdit(_id)}>edit</BUTTON_edit>
          </DisplayItems>
        );
      })}
    </Container>
  );
};

export default Data;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: teal;
  flex-direction: column;
`;

const BUTTON = styled.button`
  background-color: black;
  color: white;
  font-size: 25px;
  margin: 10px;
  
`;
const BUTTON_del = styled.button`
  background-color: red;
  color: white;
  font-size: 25px;
  margin: 10px;
  width: 70px;
`;
const BUTTON_edit = styled.button`
  background-color: green;
  color: white;
  font-size: 25px;
  margin: 10px;
  width:70px;
`;
const DisplayItems = styled.div`
  background-color: black;
  color: #fff;
  width: 400px;
  height: auto;
  display: flex;
  justify-content: center;
  margin: 20px;
  padding: 15px;
  border-radius: 15px;
`;
const INPUT = styled.input`
  font-size: 20px;
  margin: 7px;
  border-radius: 6px;
`;
const Ul = styled.ul`
  flex-direction: column;
  display: flex;
  align-items: center;
`;
const LI = styled.li`
  margin: 3px;
  list-style-type: none;
  font-weight: 700;
  font-size: 1.2rem;
`;

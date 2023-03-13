import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setData(response);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(data);
  useEffect(() => {
    getData();
  },[]);

  return (
    <div>
   
      <h1>hello</h1>
    </div>
  );
};

export default App;

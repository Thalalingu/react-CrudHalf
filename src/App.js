import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((result) => result.json())
      .then((resp) => {
        setData(resp), setId(resp[0].id);
        setName(resp[0].name);
        setEmail(resp[0].email);
      });
  }, []);

  function selectUser(id) {
    console.log(data[id - 1]);
    setId(data[id - 1].id);
    setName(data[id - 1].name);
    setEmail(data[id - 1].email);
  }
  function updateUser() {
    console.log(id, name, email);
    let item = { id, name, email };
    fetch('https://jsonplaceholder.typicode.com/users/${userId}', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((result) => result.json())
      .then((resp) => {
        setData(resp), setId(resp[0].id);
        setName(resp[0].name);
        setEmail(resp[0].email);
      });
  }
  return (
    <div>
      <h1>Get API Call</h1>
      <table border="1px">
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Email</td>
        </tr>
        {data.map((item) => (
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>
              {' '}
              <button onClick={() => selectUser(item.id)}>Update</button>
            </td>
          </tr>
        ))}
      </table>
      <br />
      <div>
        <h1>Table data coming to Form</h1>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <br />
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <button onClick={updateUser}>UpdateUser</button>
      </div>
    </div>
  );
}

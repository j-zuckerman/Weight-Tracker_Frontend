import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect, Link } from 'react-router-dom';
import { baseUrl } from '../../api/baseURL';

export const LoginForm = ({ handleToken, setUserDetails }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsername = e => {
    setUsername(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();

    axios
      .post(baseUrl + '/users/login', {
        username: username,
        password: password
      })
      .then(function(res) {
        handleToken(res.data.token);

        setUserDetails(res.data);
        setUsername('');
        setPassword('');

        setIsLoggedIn(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  if (isLoggedIn) return <Redirect to="/weights" />;
  else
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            id="username"
            placeholder="Username"
            value={username}
            onChange={handleUsername}
            fullWidth
          />
          <TextField
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <Link to="/register">Need to register an account? Register here</Link>
        </form>
      </>
    );
};

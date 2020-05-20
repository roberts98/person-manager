const fs = require('fs');
const path = require('path');
const express = require('express');
const jsonServer = require('json-server');
const axios = require('axios');

const { addId } = require('./utils');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

server.post('/api/seedDb', async (req, res) => {
  const response = await axios.get(
    'https://randomuser.me/api?results=10&inc=name,location,email,picture'
  );
  const userWithIds = addId(response.data.results);
  fs.writeFile('db.json', JSON.stringify({ users: userWithIds }), () => {
    res.json({ users: userWithIds });
  });
});

server.use(middlewares);
server.use('/api', router);
server.use('/app', express.static(path.join(__dirname, '..', 'build')));

server.listen(PORT, () => {
  console.log('JSON Server is running on port ' + PORT);
});

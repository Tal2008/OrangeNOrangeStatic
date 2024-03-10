const express = require('express');
const app = require('../Backend/dist/app');
const { createServer } = require('http');
const { parse } = require('url');
const { Server } = require('http');

module.exports = (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;

  const server = new Server(app);
  server.on('request', app);
  server.emit('request', req, res);
};

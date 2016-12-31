const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const loader = require('./loader');

const path = require('path');

app.use(express.static('build'));
app.use((req, res, next) => {
  req.loader = loader();
  next();
});

app.post('/graphql', graphqlHTTP({
  schema: schema(loader()).schema,
  graphiql: true
}));

app.listen(5000, () => {
  console.log('Listening on 5000');
});

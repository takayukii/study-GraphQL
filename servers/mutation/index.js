const app = require('express')();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

app.post('/graphql', graphqlHTTP({
  schema: schema.schema,
  graphiql: true
}));

app.listen(5000, () => {
  console.log('Listening on 5000');
});

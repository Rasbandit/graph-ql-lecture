const express = require('express');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const schema = require('./schema');

const port = 3050;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Ship docked at port: ${port}`);
});

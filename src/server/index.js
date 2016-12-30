const app = require('express')();
const schema = require('./schema');
const loader = require('./loader');

app.use((req, res, next) => {
  req.loader = loader();
  next();
});

app.get('/', (req, res) => {
  const id = req.query.film || 1;
  schema(req.loader)(`
    query find ($film: Int) {
      find_film(id: $film) {
        title
        producers
        characters(limit: 2) {
          name
          homeworld {
            name
          }
        }
      }
    }
  `, {
    film: id
  }).then(result => {
    res.send(result);
    console.dir(result, { colors: true, depth: Infinity });
  });
  // res.send('hi');
});

app.listen(5000, () => {
  console.log('Listening on 5000');
});

/**
 * Module Dependencies
 */

var Schema = require('graph.ql');

var characters = {
  1: {
    id: 1,
    name: 'Matt'
  },
  2: {
    id: 2,
    name: 'Nicole'
  },
  3: {
    id: 3,
    name: 'Tammy'
  }
};

var schema = Schema(`
  scalar Date

  type Character {
    id: Int
    name: String
    homeworld: Planet
    films: [Film]
  }

  type Film {
    title: String,
    producers(): [String]
    characters (limit: Int): [Character]
    release_date: Date
  }

  type Planet {
    name: String
    population: Int
  }

  type Query {
    find_film (id: Int): Film
    find_person (id: Int): Character
  }
`, {
  Date: {
    serialize (date) {
      return new Date(date)
    }
  },
  Character: {

  },
  Film: {
    producers (film) {
      return film.producers.split(',')
    },
    characters (film, args) {
      var ids = args.limit
        ? film.characters_ids.slice(0, args.limit)
        : film.characters_ids

      return ids.map(function (id) {
        return characters[id]
      })
    }
  },
  Planet: {

  },
  Query: {
    find_film (query, args) {
      return {
        title: 'A New Hope',
        producers: 'John,Matt,Marc',
        release_date: '1984-02-12',
        characters_ids: [1, 3, 2]
      }
    },
    find_person (query, args) {
      console.log(query, args)
    }
  }
});


schema(`
  query find ($film: Int) {
    find_film(id: $film) {
      title
      producers
      characters (limit: 2) {
        name
        id
      }
    }
  }
`).then(function(res) {
  console.dir(res, { colors: true, depth: Infinity })
});

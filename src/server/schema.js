const Schema = require('graph.ql');
const axios = require('axios');

const loader = require('./loader')();

var schema = Schema(`
  scalar Date

  type Character {
    name: String
    homeworld(): Planet
    films: [Film]
  }

  type Film {
    title: String!,
    producers(): [String]
    characters (limit: Int): [Character]
    release_date: Date
  }

  type Planet {
    name: String!
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
    homeworld (character, args) {
      return loader.planet.load(character.homeworld);
      // return axios.get(character.homeworld).then(res => res.data);
    }
  },
  Film: {
    producers (film) {
      return film.producer.split(', ');
    },
    characters (film, args) {
      const characters = args.limit ? film.characters.slice(0, args.limit) : film.characters;
      return loader.character.loadMany(characters);
      // return axios.all(characters.map((url) => {
      //   return axios.get(url).then(res => res.data);
      // }));
    }
  },
  Planet: {

  },
  Query: {
    find_film (query, args) {
      return loader.film.load(args.id);
      // return axios.get(`http://swapi.co/api/films/${args.id}/`).then(res => res.data);
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
      characters(limit: 2) {
        name
        homeworld {
          name
        }
      }
    }
  }
`, {
  film: 1
}).then(function(res) {
  console.dir(res, { colors: true, depth: Infinity })
});

const DataLoader = require('dataloader');
const axios = require('axios');

module.exports = function () {
  return {
    film: Film(),
    character: Character(),
    planet: Planet()
  };
};

function Film () {
  return new DataLoader((ids) => {
    return axios.all(ids.map((id) => {
      const url = Number.isInteger(id) ? `http://swapi.co/api/films/${id}/` : id;
      return axios.get(url).then(res => res.data);
    }));
  });
}

function Character () {
  return new DataLoader((ids) => {
    return axios.all(ids.map((id) => {
      const url = Number.isInteger(id) ? `http://swapi.co/api/people/${id}/` : id;
      return axios.get(url).then(res => res.data);
    }));
  });
}

function Planet () {
  return new DataLoader((ids) => {
    return axios.all(ids.map((id) => {
      const url = Number.isInteger(id) ? `http://swapi.co/api/planets/${id}/` : id;
      return axios.get(url).then(res => res.data);
    }));
  });
}


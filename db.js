const sequelize = require('sequelize');

const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const memberModel = require('./models/member');

/**
 * 1.- Nombre de la db
 * 2.- Usuario
 * 3.- Contraseña
 * 4.- Objeto de config del ORM
 */

const sequelize = new Sequelize('video-club', 'root', 'abcd1234',{
    host: '127.0.0.1',
    dialect: 'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const Member = memberModel (sequelize, Sequelize);

//Un genero puede tener muchas pelis
Genre.hasMany(Movie, {as: 'movies'});
//Una peli tiene un genero
Movie.belongsTo(Genre, {as: 'genre'});
//Un dir puede tener muchas películas
Director.hasMany(Movie, {as: 'movies'});
//Una peli tiene un dir
Movie.belongsTo(Movie, {as: 'director'});

sequelize.sync({
    force: false
}).then(()=>{
    console.log('Base de datos sincronizada.');
});

module.exports = {Director, Genre, Movie, Actor, Member};
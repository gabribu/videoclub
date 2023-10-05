const express = require('express');
const {Movie} = require('../db');
const genre = require('../models/genre');

function create(req, res, next){
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    Movie.create({
        title: title,
        genreId: genreId,
        directorId: directorId
    }).then (object => res.json(object)).catch(err => res.send(err));
}

function list(req, res, next) {
    Movie.findAll({include: ['genre', 'director']})
    .then(objects => res.json(objects))
    .catch(err => res.send (err));
}

function index(req, res, next){
    const id = req.params.id;
    Movie.findByPk(id).then(object => res.json(object)).catch(err => res.send(err));
}

function replace(req, res, next){
    res.send('Users replace');
}

function update(req, res, next){
    res.send('Users update');
}

function destroy(req, res, next){
    res.send('Users destroy');
}

module.exports = {
    create, list, index, replace, update, destroy
};
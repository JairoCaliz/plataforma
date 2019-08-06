const express = require('express');
const router = express.Router();

// Models
const Recurso = require('../models/Recurso');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// New Recursos
router.get('/recursos/add', isAuthenticated, (req, res) => {
  res.render('recursos/new-recurso');
});

router.post('/recursos/new-recurso', isAuthenticated, async (req, res) => {
  const { title, description,} = req.body;
  const errors = [];

  if (!title) {
    errors.push({text: 'Por favor escriba un título.'});
  }
  if (!description) {
    errors.push({text: 'Por favor escriba una descripción'});
  }

  if (errors.length > 0) {
    res.render('recursos/new-recurso', {
      errors,
      title,
      description
    });
  } else {

    const newRecurso = new Recurso();
    newRecurso.user = req.user.id;
    newRecurso.user.name = req.user.name;
    newRecurso.title = req.body.title;
    newRecurso.description = req.body.description;
    newRecurso.grado = req.body.grado;
    newRecurso.categoria = req.body.categoria;
    newRecurso.filename = req.file.filename;
    newRecurso.path = '/img/uploads/' + req.file.filename;
    newRecurso.originalname = req.file.originalname;
    newRecurso.mimetype = req.file.mimetype;
    newRecurso.size = req.file.size;

    await newRecurso.save();

    req.flash('success_msg', 'recurso agregado con éxito');
    res.redirect('/recursos');
  }
});

// Get All recursos
router.get('/recursos', isAuthenticated, async (req, res) => {
  const recursos = await Recurso.find({user: req.user.id}).sort({date: 'desc'});
  res.render('recursos/all-recursos', { recursos });
});


// Edit recurso
router.get('/recursos/edit/:id', isAuthenticated, async (req, res) => {
  const recurso = await Recurso.findById(req.params.id);
  if(recurso.user != req.user.id) {
    req.flash('error_msg', 'No autorizado');
    return res.redirect('/recursos');
  }
  res.render('recursos/edit-recurso', { recurso });
});

router.put('/recursos/edit-recurso/:id', isAuthenticated, async (req, res) => {
  const { title, description} = req.body;
  await Recurso.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', 'Recurso actualizado con éxito');
  res.redirect('/recursos');
});

// Deleterecurso
router.delete('/recuros/delete/:id', isAuthenticated, async (req, res) => {
  await Recurso.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'recurso eliminado con éxito');
  res.redirect('/recuros');
});

module.exports = router;

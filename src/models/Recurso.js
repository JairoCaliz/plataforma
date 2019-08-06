const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecursoSchema = new Schema({
  title: {type: String},
  description: {type: String},
  grado: {type: String},
  categoria: {type: String},
  filename: {type: String},
  path: {type: String},
  originalname: {type: String},
  mimetype: {type: String},
  size: { type: Number},
//   created_at: {type: Date, default: Date.now()},
  user: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Recurso', RecursoSchema);

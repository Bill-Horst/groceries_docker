const mongoose = require('mongoose');

const grocerySchema = mongoose.Schema({
    groceryName: { type: String },
    checked: { type: Boolean }
});

module.exports = mongoose.model('Grocery', grocerySchema);
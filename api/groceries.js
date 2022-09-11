const express = require('express');
const Grocery = require('./grocery.model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Grocery.find().then(foundGroceries => {
        return res.status(200).json({ message: 'got \'em', groceries: foundGroceries });
    }).catch(err => {
        console.log('error getting groceries: ', err);
    });
});

router.post('/', (req, res, next) => {
    const newGrocery = req.body.grocery;
    Grocery.create(newGrocery).then(newGrocery => {
        return res.status(200).json({ message: 'added it', grocery: newGrocery });
    }).catch(err => {
        console.log('error adding grocery: ', err);
    });
});

router.put('/', (req, res, next) => {
    const newGrocery = req.body.grocery;
    Grocery.findOneAndReplace({ _id: newGrocery._id }, newGrocery).then(originalGrocery => {
        return res.status(200).json({ message: 'added it', oldGrocery: originalGrocery });
    }).catch(err => {
        console.log('error adding grocery: ', err);
    });
})

router.delete('/:groceryId', (req, res, next) => {
    Grocery.deleteOne({ _id: req.params.groceryId }).then(deletedGrocery => {
        return res.status(200).json({ message: 'deleted it' });
    }).catch(err => {
        console.log('error deleting grocery: ', err);
    });
});

module.exports = router;
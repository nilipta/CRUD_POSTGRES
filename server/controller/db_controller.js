'use strict';

var db_insert = require('./../db/db_insert');
var db_count = require('./../db/db_count');

/**
 * GET /things
 *
 * @description
 * list of things
 *
 */
exports.find = function (req, res, next) {
    Thing.find(function (err, things) {
        if (err) {
            return next(err);
        }
        return res.status(200).json(things);
    });
};

/**
 * GET /things/:id
 *
 * @description
 * Find thing by id
 *
 */
exports.get = function (req, res, next) {
    Thing.findById(req.params.id, function (err, thing) {
        if (err) {
            return next(err);
        }
        if (!thing) {
            return res.status(404).send('Not Found');
        }
        return res.status(200).json(thing);
    });
};

/**
 * POST /things
 *
 * @description
 * Create a new thing
 *
 */
exports.post = function (req, res, next) {
    Thing.create(req.body, function (err, thing) {
        if (err) {
            return next(err);
        }
        return res.status(201).json(thing);
    });
};

/**
 * PUT /things/:id
 *
 * @description
 * Update a thing
 *
 */
// exports.put = function (req, res, next) {
//     Thing.findById(req.params.id, function (err, thing) {
//         if (err) {
//             return next(err);
//         }
//         if (!thing) {
//             return res.status(404).send('Not Found');
//         }

//         thing.name = req.body.name;
//         thing.description = req.body.description;

//         thing.save(function (err) {
//             if (err) {
//                 return next(err);
//             }
//             return res.status(200).json(thing);
//         });
//     });
// };


exports.put = function (obj, next) {
    db_insert.insertData(obj);
};

exports.save = function (querycount, queryInsert, queryUpdate, next) {
    db_count.getDbData(querycount)
        .then((data) => {
            console.log(data);
            if (data[0].count == 0) {
                // insert function
                console.log('data is 0');
                db_insert.insertData(queryInsert)
                    .then(() => {
                        console.log('inserted a new line');
                    })
                    .catch(() => {
                        console.log('error happened in insert');
                    })
            }
            else {
                // update function
                console.log('data is not 0');
                db_insert.insertData(queryUpdate)
                    .then(() => {
                        console.log('updated a new line');
                    })
                    .catch(() => {
                        console.log('error happened in update');
                    })

            }
        })
};
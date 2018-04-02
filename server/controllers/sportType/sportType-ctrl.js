const SportType = require('./sportType-modal');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function (app) {
    app.post('/api/sType', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addsTypeAsync(element);
            }, this);
        else {
            addsTypeAsync(req.body);
        }
        res.send({ data: req.body, message: "sType added successfully" })
    });
    app.get('/api/sType', (req, res) => {
        SportType.find({}, function (err, sTypes) {
            if (err) {
                res.json({ data: null, message: JSON.stringify(err) });
            } else {
                res.json({ data: sTypes, message: "200" });
            }
        });
    });
    app.get('/api/sType/:id', (req, res) => {
        getsTypeAsync({ _id: req.params.id }).then((data) => {
            console.log(data);
            res.send({ data: data, message: "sType found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/sType/:id', (req, res) => {
        SportType.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, sType) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: sType, message: "sType updated successfully" })
            }

        });
    });
    app.delete('/api/sType/:id', (req, res) => {
        SportType.findOneAndRemove({ _id: req.params.id }, function (err, sType) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: sType, message: "sType removed successfully" })
            }
        });
    })

    // info 
    async function addsTypeAsync(sType) {
        let _results;
        await new SportType({
            name: sType.name,
            images: sType.images
        }).save(function (err, results) {
            if (err) throw err;
            _results = results;
        });
        return _results;
    }
    // location
    // extra => {comments , likes , dislikes , manOfTheMatch}


    async function getsTypeAsync(option) {
        return await SportType.find(option).exec()
         
    }

}
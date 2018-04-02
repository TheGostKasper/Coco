const Pitch = require('./pitch-modal');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function (app) {
    app.post('/api/pitch', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addpitchAsync(element);
            }, this);
        else {
            addpitchAsync(req.body);
        }
        res.send({ data: req.body, message: "pitch added successfully" })
    });
    app.get('/api/pitch', (req, res) => {
        Pitch.find({}, function (err, pitchs) {
            if (err) {
                res.json({ data: null, message: JSON.stringify(err) });
            } else {
                res.json({ data: pitchs, message: "200" });
            }
        });
    });
    app.get('/api/pitch/:id', (req, res) => {
        getpitchAsync({ _id: req.params.id }).then((data) => {
            res.send({ data: data, message: "data found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/pitch/type/:id', (req, res) => {
        getpitchAsync({ type: req.params.id }).then((data) => {
            res.send({ data: data, message: "data found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    })
    
    app.get('/api/host/pitch/:id', (req, res) => {
        getpitchAsync({ host_id: req.params.id }).then((data) => {
            res.send({ data: data, message: "data found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.put('/api/pitch/:id', (req, res) => {
        Pitch.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, pitch) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: pitch, message: "pitch updated successfully" })
            }

        });
    });
    app.delete('/api/pitch/:id', (req, res) => {
        Pitch.findOneAndRemove({ _id: req.params.id }, function (err, pitch) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: pitch, message: "pitch removed successfully" })
            }
        });
    })

    function getToken(pitch) {
        const payload = {
            pitch: pitch
        };
        return jwt.sign(payload, app.get('superSecret'));
    }

    async function addpitchAsync(pitch) {
        let _results;
        await new Pitch(pitch).save(function (err, results) {
            if (err) throw err;
            _results = results;
        });
        return _results;
    }

    async function getpitchAsync(option) {
        return await Pitch.find(option).exec();
    }

}
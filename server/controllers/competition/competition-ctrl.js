const Competition = require('./competition-modal');

module.exports = function (app) {
    app.post('/api/competition', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addCompetitionAsync(element).then((data) => { }).catch(err => console.log(err));
            }, this);
        else {
            addCompetitionAsync(req.body).then((data) => { }).catch(err => console.log(err));
        }
        res.send({ data: req.body, message: "competition added successfully" })
    });
    app.get('/api/competition', (req, res) => {
        getCompetitionAsync().then(data => {
            res.send({ data: data, message: "competition found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/competition/:id', (req, res) => {
        getCompetitionAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "competition found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/competition/:id', (req, res) => {
        Competition.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, competition) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: competition, message: "competition updated successfully" })
            }

        });
    });
    app.delete('/api/competition/:id', (req, res) => {
        Competition.findOneAndRemove({ _id: req.params.id }, function (err, competition) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: competition, message: "competition removed successfully" })
            }
        });
    });

     // Comments 
     app.post('/api/competition/comments/:id', (req, res) => {
        addSubArray(req.params.id, { "extra.comments": req.body.comments })
            .then((data) =>
                res.send({ data: data, message: "Comment sent successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/competition/comments/:id', (req, res) => {
        delSubArray({ "extra.comments": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Comment deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });
    async function addCompetitionAsync(competition) {
        return await new competition(competition).save(function (err, results) {
            if (err) throw err;
            return results;
        });
    }
    async function getCompetitionAsync(competition) {
        return await new competition(competition).save(function (err, results) {
            if (err) throw err;
            return results;
        });
    }

    async function delSubArray(option) {
        return await Competition.update({},
            { $pull: option },
            { multi: true }
        ).exec();
    }
    async function addSubArray(id, option) {
        return await Competition.findOneAndUpdate({ _id: id }, {
            $push: option
        }).exec();
    }
}
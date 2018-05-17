const Team = require('./team-modal');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function (app) {
    app.post('/api/team', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addTeamAsync(element).then((data) => console.log(data)).catch(err => console.log(err));
            }, this);
        else {
            addTeamAsync(req.body).then((data) => console.log(data)).catch(err => console.log(err));
        }
        res.send({ data: req.body, message: "team added successfully" })
    });
    app.get('/api/team', (req, res) => {
        getTeamAsync({}).then(data => {
            res.send({ data: data, message: "team found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/team/:id', (req, res) => {
        getTeamAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "team found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/team/:id', (req, res) => {
        Team.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, team) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: team, message: "team updated successfully" })
            }

        });
    });
    app.delete('/api/team/:id', (req, res) => {
        Team.findOneAndRemove({ _id: req.params.id }, function (err, team) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: team, message: "team removed successfully" })
            }
        });
    });

    // Players
    app.post('/api/team/players/:id', (req, res) => {
        addSubArray(req.params.id, { players: req.body.players })
            .then((data) =>
                res.send({ data: data, message: "player added successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/team/players/:id', (req, res) => {
        delSubArray({ players: { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "player deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });

    // Admins
    app.post('/api/team/admins/:id', (req, res) => {
        addSubArray(req.params.id, { admins: req.body.admins })
            .then((data) =>
                res.send({ data: data, message: "player added successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/team/admins/:id', (req, res) => {
        delSubArray({ admins: { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "player deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });

    // Sports type
    app.post('/api/team/types/:id', (req, res) => {
        addSubArray(req.params.id, { sportsType: req.body.sportsType })
            .then((data) =>
                res.send({ data: data, message: "player added successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/team/types/:id', (req, res) => {
        delSubArray({ sportsType: { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "player deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });

    // Comments 
    app.post('/api/team/comments/:id', (req, res) => {
        addSubArray(req.params.id, { "extra.comments": req.body.comments })
            .then((data) =>
                res.send({ data: data, message: "Comment sent successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/team/comments/:id', (req, res) => {
        delSubArray({ "extra.comments": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Comment deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });
    // info 
    async function addTeamAsync(team) {
        return await new Team(team).save(function (err, results) {
            if (err) throw err;
            return results;
        });
    }

    async function delSubArray(option) {
        return await Team.update({},
            { $pull: option },
            { multi: true }
        ).exec();
    }
    async function addSubArray(id, option) {
        return await Team.findOneAndUpdate({ _id: id }, {
            $push: option
        }).exec();
    }
    // location
    // extra => {comments , likes , dislikes , manOfTheMatch}


    async function getTeamAsync(option) {
        return await Team.find(option).exec();
    }

}
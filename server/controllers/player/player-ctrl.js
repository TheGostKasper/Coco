const Player = require('./player-modal');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function (app) {
    app.post('/api/player', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addplayerAsync(element).then((data) => console.log(data)).catch(err => console.log(err));
            }, this);
        else {
            addplayerAsync(req.body).then((data) => console.log(data)).catch(err => console.log(err));
        }
        res.send({ data: req.body, message: "player added successfully" })
    });
    app.get('/api/player', (req, res) => {
        Player.find({}, (err, players) => {
            if (err) res.json({ data: null, message: JSON.stringify(err) });
            else res.json({ data: players, message: "200" });
        });
    });
    app.get('/api/player/:id', (req, res) => {
        getPlayerAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "player found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/player/:id', (req, res) => {
        Player.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, player) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: player, message: "player updated successfully" })
            }

        });
    });

    app.post('/api/player/types/:id', (req, res) => {
        addSubArray(req.params.id, { sportsType: req.body.sportsType })
            .then((data) =>
                res.send({ data: data, message: "player updated successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/player/types/:id', (req, res) => {
        delSubArray({ sportsType: { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "player updated successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });

    app.post('/api/player/team/:id', (req, res) => {
        addSubArray(req.params.id, { team: req.body.team })
            .then((data) =>
                res.send({ data: data, message: "player updated successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/player/team/:id', (req, res) => {
        delSubArray({ team: { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "player updated successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });

    app.post('/api/player/group/:id', (req, res) => {
        addSubArray(req.params.id, { group: req.body.group })
            .then((data) =>
                res.send({ data: data, message: "player updated successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/player/group/:id', (req, res) => {
        delSubArray({ group: { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "player updated successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });

    app.delete('/api/player/:id', (req, res) => {
        Player.findOneAndRemove({ _id: req.params.id }, (err, player) => {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: player, message: "player removed successfully" })
            }
        });
    })

   // Comments 
   app.post('/api/player/comments/:id', (req, res) => {
    addSubArray(req.params.id, { "extra.comments": req.body.comments })
        .then((data) =>
            res.send({ data: data, message: "Comment sent successfully" })
        ).catch(err => res.send({ data: null, err: err }));

});
app.delete('/api/player/comments/:id', (req, res) => {
    delSubArray({ "extra.comments": { _id: req.params.id } })
        .then((data) =>
            res.send({ data: data, message: "Comment deleted successfully" })
        ).catch(err => res.send({ data: null, err: err }));
});



    // info 
    async function addplayerAsync(player) {
        return await new Player(player).save((err, results) => {
            if (err) throw err;
            else return results;
        });
    }

    async function delSubArray(option) {
        return await Player.update({},
            { $pull: option },
            { multi: true }
        ).exec();
    }
    async function addSubArray(id, option) {
        return await Player.findOneAndUpdate({ _id: id }, {
            $push: option
        }).exec();
    }
    // location
    // extra => {comments , likes , dislikes , manOfTheMatch}


    async function getPlayerAsync(option) {
        return await Player.find(option).exec();
    }

}
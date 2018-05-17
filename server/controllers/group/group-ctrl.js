const Group = require('./group-modal');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function (app) {
    app.post('/api/group', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addgroupAsync(element).then((data) => { }).catch(err => console.log(err));
            }, this);
        else {
            addgroupAsync(req.body).then((data) => { }).catch(err => console.log(err));
        }
        res.send({ data: req.body, message: "group added successfully" })
    });
    app.get('/api/group', (req, res) => {
        getGroupAsync().then(data => {
            res.send({ data: data, message: "group found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/group/:id', (req, res) => {
        getGroupAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "group found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/group/:id', (req, res) => {
        Group.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, group) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: group, message: "group updated successfully" })
            }

        });
    });
    app.delete('/api/group/:id', (req, res) => {
        Group.findOneAndRemove({ _id: req.params.id }, function (err, group) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: group, message: "group removed successfully" })
            }
        });
    })
    // Teams
    app.post('/api/group/team/:id', (req, res) => {
        addSubArray(req.params.id, { teams: req.body.teams })
            .then((data) =>
                res.send({ data: data, message: "Team Added successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/group/team/:id', (req, res) => {
        delSubArray({ teams: { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Team deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });
    // Players
    app.post('/api/group/player/:id', (req, res) => {
        addSubArray(req.params.id, { players: req.body.players })
            .then((data) =>
                res.send({ data: data, message: "Player Added successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/group/player/:id', (req, res) => {
        delSubArray({ players: { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Player deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });
    //Comments
    app.post('/api/group/comments/:id', (req, res) => {
        addSubArray(req.params.id, { "extra.comments": req.body.comments })
            .then((data) =>
                res.send({ data: data, message: "Comment sent successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/group/comments/:id', (req, res) => {
        delSubArray({ "extra.comments": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Comment deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });

    // Shared
    app.post('/api/group/shared/:id', (req, res) => {
        addSubArray(req.params.id, { "extra.shared": req.body.shared })
            .then((data) =>
                res.send({ data: data, message: "Comment sent successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/group/shared/:id', (req, res) => {
        delSubArray({ "extra.shared": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Comment deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });
    // Inc [likes, dislikes]
    app.post('/api/group/like/:id', (req, res) => {
        incSubArray(req.params.id, { "extra.shared": req.body.shared })
            .then((data) =>
                res.send({ data: data, message: "Comment sent successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });

    // info 
    // location
    // extra => {comments , likes , dislikes , manOfTheMatch}


    async function addgroupAsync(group) {
        return await new Group(group).save(function (err, results) {
            if (err) throw err;
            return results;
        });
    }
    async function incLikes(id, option, val) {
        return await Group.update({ _id: id }, { $inc: { "extra.likes": val } }).exec();
    }
    async function incPoints(id, option, val) {
        return await Group.update({ _id: id }, { $inc: { "extra.points": val } }).exec();
    }
    async function delSubArray(option) {
        return await Group.update({}, { $pull: option }, { multi: true }).exec();
    }
    async function addSubArray(id, option) {
        return await Group.findOneAndUpdate({ _id: id }, { $push: option }, { upsert: true }).exec();
    }

    async function getGroupAsync(option) {
        return await Group.find(option).exec();
    }

}
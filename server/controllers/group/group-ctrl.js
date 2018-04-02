const Group = require('./group-modal');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function (app) {
    app.post('/api/group', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addgroupAsync(element);
            }, this);
        else {
            addgroupAsync(req.body);
        }
        res.send({ data: req.body, message: "group added successfully" })
    });
    app.get('/api/group', (req, res) => {
        Group.find({}, function (err, groups) {
            if (err) {
                res.json({ data: null, message: JSON.stringify(err) });
            } else {
                res.json({ data: groups, message: "200" });
            }
        });
    });
    app.get('/api/group/:id', (req, res) => {
        getgroupAsync({ _id: req.params.id }).then(data => {
            res.send({ data: group, message: "group found" });
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

    // info 
    async function addgroupAsync(group) {
        let _results;
        await new Group(group).save(function (err, results) {
            if (err) throw err;
            _results = results;
        });
        return _results;
    }
    // location
    // extra => {comments , likes , dislikes , manOfTheMatch}


    async function getgroupAsync(option) {
        let _data;
        await Group.find(option).exec().then((data) => {
            _data = data;
        }).catch(err => {
            _data = null;
        });
        return _data;
    }

}
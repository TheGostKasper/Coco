const Schedule = require('./schedule-modal');

module.exports = function (app) {

    app.post('/api/schedule', (req, res) => {
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addscheduleAsync(element).then(data => { }).catch(err => console.log(err));
            }, this);
        else {
            addscheduleAsync(req.body).then(data => { }).catch(err => console.log(err));
        }
        res.send({ data: req.body, message: "schedule added successfully" })
    });
    app.get('/api/schedule', (req, res) => {
        Schedule.find({}, function (err, schedules) {
            if (err) {
                res.json({ data: null, message: JSON.stringify(err) });
            } else {
                res.json({ data: schedules, message: "200" });
            }
        });
    });
    app.get('/api/pitch/schedule/:id', (req, res) => {
        getscheduleAsync({ pitch_id: req.params.id }).then(data => {
            res.send({ data: pitch, message: "pitch found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });

    })
    app.get('/api/schedule/:id', (req, res) => {
        getscheduleAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "pitch found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });

    });
    app.put('/api/schedule/:id', (req, res) => {
        Schedule.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, schedule) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: schedule, message: "schedule updated successfully" })
            }

        });
    });
    app.delete('/api/schedule/:id', (req, res) => {
        Schedule.findOneAndRemove({ _id: req.params.id }, function (err, schedule) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: schedule, message: "schedule removed successfully" })
            }
        });
    })

    async function addscheduleAsync(schedule) {
        return await new Schedule(schedule).save(function (err, results) {
            if (err) throw err;
            else return results;
        });
    }
    async function getscheduleAsync(option) {
        return await Schedule.find(option).exec();
    }

}
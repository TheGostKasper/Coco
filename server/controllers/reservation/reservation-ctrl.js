const Reservation = require('./reservation-modal');

module.exports = function (app) {
    app.post('/api/reservation', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addReservationAsync(element).then((data) => { }).catch(err => console.log(err));
            }, this);
        else {
            addReservationAsync(req.body).then((data) => { }).catch(err => console.log(err));
        }
        res.send({ data: req.body, message: "reservation added successfully" })
    });
    app.get('/api/reservation', (req, res) => {
        getReservationAsync().then(data => {
            res.send({ data: data, message: "reservation found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/reservation/:id', (req, res) => {
        getReservationAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "reservation found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/reservation/:id', (req, res) => {
        Reservation.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, reservation) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: reservation, message: "reservation updated successfully" })
            }

        });
    });
    app.delete('/api/reservation/:id', (req, res) => {
        Reservation.findOneAndRemove({ _id: req.params.id }, function (err, reservation) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: reservation, message: "reservation removed successfully" })
            }
        });
    });
    async function addReservationAsync(reservation) {
        return await new Reservation(reservation).save(function (err, results) {
            if (err) throw err;
            return results;
        });
    }
    async function getReservationAsync(reservation) {
        return await new Reservation(reservation).save(function (err, results) {
            if (err) throw err;
            return results;
        });
    }
}
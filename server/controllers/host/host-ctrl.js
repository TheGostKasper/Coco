const Host = require('./host-modal');

module.exports = function (app) {

    app.post('/api/host', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addhostAsync(element);
            }, this);
        else {
            addhostAsync(req.body);
        }
        res.send({ data: req.body, message: "host added successfully" })
    });
    app.get('/api/host', (req, res) => {
        Host.find({}, function (err, hosts) {
            if (err) {
                res.json({ data: null, message: JSON.stringify(err) });
            } else {
                res.json({ data: hosts, message: "200" });
            }
        });
    });
    app.get('/api/host/:id', (req, res) => {
        gethostAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "host found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    
    app.put('/api/host/:id', (req, res) => {
        Host.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, host) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: host, message: "host updated successfully" })
            }

        });
    });
    app.delete('/api/host/:id', (req, res) => {
        Host.findOneAndRemove({ _id: req.params.id }, function (err, host) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: host, message: "host removed successfully" })
            }
        });
    })

    async function addhostAsync(host) {
        let _results;
        await new Host(host).save(function (err, results) {
            if (err) throw err;
            _results = results;
        });
        return _results;
    }

    async function gethostAsync(option) {
        let _data;
        await Host.find(option).exec().then((data) => {
            _data = data;
        }).catch(err => {
            _data = null;
        });
        return _data;
    }

}
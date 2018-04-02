const Type = require('./type-modal');

module.exports = function (app) {

    app.post('/api/type', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addTypeAsync(element).then(data=>{}).catch(err=>{});
            }, this);
        else {
            addTypeAsync(req.body).then(data=>{}).catch(err=>{});
        }
        res.send({ data: req.body, message: "host added successfully" })
    });
    app.get('/api/type', (req, res) => {
        getTypeAsync({}).then(data => {
            res.send({ data: pitch, message: "host found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/type/:id', (req, res) => {
        getTypeAsync({ _id: req.params.id }).then(data => {
            res.send({ data: pitch, message: "host found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/type/:type', (req, res) => {
        getTypeAsync({ name: req.params.type }).then(data => {
            res.send({ data: pitch, message: "host found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    })
    app.get('/api/type/image/:id', (req, res) => {
        getTypeAsync({ id: req.params.type }).then(data => {
            res.send({ data: pitch, message: "host found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    })
    app.put('/api/type/:id', (req, res) => {
        Type.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, host) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: host, message: "host updated successfully" })
            }

        });
    });
    app.delete('/api/type/:id', (req, res) => {
        Type.findOneAndRemove({ _id: req.params.id }, function (err, host) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: host, message: "host removed successfully" })
            }
        });
    })
    async function addTypeAsync(_type) {
        let _results;
        await new Host(_type).save(function (err, results) {
            if (err) throw err;
            _results = results;
        });
        return _results;
    }

    async function getTypeAsync(option) {
        let _data;
        await Type.find(option).exec().then((data) => {
            _data = data;
        }).catch(err => {
            _data = null;
        });
        return _data;
    }

}
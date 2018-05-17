const jwt = require('jsonwebtoken');
const Host = require('./../host/host-modal');
const Player = require('./../player/player-modal');

module.exports = function (app) {
    app.post('/login', (req, res) => {
        var _body = req.body;
        login(_body.type, { email: _body.email, password: _body.password })
            .then(data => {
                if (data === null) {
                    return res.json(displayError());
                }
                else {
                    return res.json({ data: data, token: getToken(data), message: "Welcome back! " });
                }
            }).catch(err => {
                return res.json(displayError());
            });
    });

    app.post('/signUp', (req, res) => {
        var _body = req.body;
        sigUp(_body)
            .then(data => {
                data.save(function (err, results) {
                    if (err) return res.json(displayError());
                    console.log(results);
                    return res.json({ data: _body, token: getToken(_body), message: "Hello there!" })
                });
            }).catch(err => {
                return res.json(displayError(message = err));
            });
    })

    // get token
    function getToken(user) {
        const payload = {
            user: user
        };
        return jwt.sign(payload, app.get('superSecret'));
    }
    async function sigUp(body) {
        if (body.type.toLowerCase() === 'host') {
            return await new Host({
                name: body.name,
                availability: true,
                password: body.password,
                email: body.email
            })
        } else {
            return await new Player({
                name: body.name,
                availability: true,
                password: body.password,
                email: body.email
            })
        }
    }
    // diff login
    async function login(type, filter) {
        if (type.toLowerCase() === 'host') {
            return await Host.findOne(filter).exec();
        } else {
            return await Player.findOne(filter).exec();
        }
    }

    function displayError(data = null, message = "Authentication faild, Username or password is incorect") {
        return { data: data, message: message }
    }

    // validate token

    // encrypt password


}
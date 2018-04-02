module.exports = function (app) {
    var middleware = require(`./../common/middleware.js`)(app);
    var hosts = require(getUrl('host'))(app)
    var pitchs = require(getUrl('pitch'))(app)
    var schedules = require(getUrl('schedule'))(app)
    var types = require(getUrl('type'))(app)
    var players = require(getUrl('player'))(app)
    var sportTypes = require(getUrl('sportType'))(app)
    var teams = require(getUrl('team'))(app)
    var groups = require(getUrl('group'))(app)
    var registrations = require(getUrl('registration'))(app)



    function getUrl(ctrl) {
        return `./../controllers/${ctrl}/${ctrl}-ctrl.js`;
    }
}
var Controllers = require('../controllers/controllers')



module.exports = function (app) {


//CREATE NEW MESSAGE ROUTE
app.post('/sendmail', function(req, res) {
    Controllers.newMessage(req, res)
});




}


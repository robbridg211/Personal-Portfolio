const collections = require('../models/models');
const PortfolioMessage = collections.PortfolioMessage;


module.exports = {


    //CREATE NEW MESSAGE ROUTE
    newMessage: function(req, res) {
        PortfolioMessage.create(req.body, function(err, user) {
            if(err) {
                let data = {}
                for (let key in err.errors) {
                    data[key] = err.errors[key].message;
                }
                console.log('We have an error', err);
                res.json({message: "Error", error: err})
                } 
            else {
                console.log('Message Successfully added to DB!', user);
                res.json({status: "Successfully added!", user: user});
            }
        });
    }

}
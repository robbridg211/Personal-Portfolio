
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/portfolioMessages', { useNewUrlParser: true });// Use native promises
mongoose.Promise = global.Promise;


var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const PortfolioMessageSchema = new mongoose.Schema({
    name: { type: String, required: [true, "*Name is required"], minlength: [3, "*Must be at least 3 characters"]},

    email: { type: String, required: [true, "*Email is required"], validate: [validateEmail, '*Please enter a valid email address'], match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/, '*Please enter a valid email address']},

    company: { type: String, required: [true, '*Company number is required']},

    message: { type: String, required: [true, "*Message is required"]},

  },
  { timestamps: true});

const PortfolioMessage = mongoose.model('PortfolioMessage', PortfolioMessageSchema);

  
module.exports = {
  PortfolioMessage: PortfolioMessage
}
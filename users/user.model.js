const { formatDistanceWithOptions } = require('date-fns/fp');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Plaese tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

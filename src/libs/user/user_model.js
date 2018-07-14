const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

UserSchema.methods.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

module.exports = mongoose.model('User', UserSchema);

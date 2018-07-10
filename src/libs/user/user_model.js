const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

UserSchema.methods.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

module.exports = mongoose.model('user', UserSchema);

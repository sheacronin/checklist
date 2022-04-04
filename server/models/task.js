const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    text: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
});

module.exports = mongoose.model('Task', TaskSchema);

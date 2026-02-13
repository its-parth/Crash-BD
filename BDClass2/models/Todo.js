const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true,
            maxlength: 50,
        },
        description : {
            type: String,
            required: true,
            maxlength: 100,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Todo", todoSchema);
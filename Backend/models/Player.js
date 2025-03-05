const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    
    playerName:{
        type: String,
        required: true
    },
    playerRuns: {
        type: Number,
        default:0
    },
    playerWickets: {
        type: Number,
        default:0
    },
    isOut:{
        type: Boolean,
        default: false
    },
    outType: {
        type: String,
        default: ""
    },
    strikeRate: {
        type: Number,
        default: 0
    },
    BowlingAverage: {
        type: Number,
        default: 0
    },
    BowlingEconomy: {
        type: Number,
        default: 0
    },
    playerBowlingOvers: {
        type: Number,
        default: 0
    },
    playerBowlingRuns: {
        type: Number,
        default: 0
    },


});


module.exports = mongoose.model("Players", playerSchema);
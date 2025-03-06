const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    
   hostTeam: {
        type: mongoose.Types.ObjectId,
        ref: "Team",
    },
    visitorTeam: {
        type: mongoose.Types.ObjectId,
        ref: "Team",
    },
    tossWon: {
        type: mongoose.Types.ObjectId,
        ref: "Team",
    },
    battingTeam:{
        type: mongoose.Types.ObjectId,
        ref: "Team",
    },
    bowlingTeam: {
        type: mongoose.Types.ObjectId,
        ref: "Team",
    },
    
    choice:{
        type: String,
        default: ""
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    winnerTeam: {
        type: mongoose.Types.ObjectId,
        ref: "Team",
    },
    totalOvers: {
        type: Number,
        default: 0
    },
    isNoBall: {
        type: Boolean,
        default: false
    },
    noBallRun: {
        type: Number,
        default: 0
    },
    isWideRun: {
        type: Boolean,
        default: false
    },
    wideRun: {
        type: Number,
        default: 0
    },
});


module.exports = mongoose.model("Matches", matchSchema);
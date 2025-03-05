const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    
    noPlayers: {
        type: Number,
        default: 0
    },
    isTossWon: {
        type: Boolean,
        default: false
    },
    currentStrickerBatsman: {
        type: mongoose.Types.ObjectId,
        ref: "Player",
    },
    currentNonStrickerBatsman:{
        type: mongoose.Types.ObjectId,
        ref: "Player",
    },
    currentBowler: {
        type: mongoose.Types.ObjectId,
        ref: "Player",
    },
    playerList: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Player",
        }
    ],
    runsByTeam: {
        type: Number,
        default: 0
    },
    wicketsByTeam: {
        type: Number,
        default: 0
    },
    oversByTeam: {
        type: Number,
        default: 0
    },
    currentBalls: {
        type: Number,
        default: 0
    },
    
    currentOver: [String],
    ballsByTeam: {
        type: Number,
        default: 0
    },
    isWin: {
        type: Boolean,
        default: false
    },
    wonByRuns: {
        type: Number,
        default: 0
    },
    wonByWickets: {
        type: Number,
        default: 0
    },
    wonByOvers: {
        type: Number,
        default: 0
    },
    wonByBalls: {
        type: Number,
        default: 0
    },
    historyBattingLineup: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Player",
        }
    ],
    historyBowlingLineup: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Player",
        }
    ],

});

module.exports = mongoose.model("Team", teamSchema);
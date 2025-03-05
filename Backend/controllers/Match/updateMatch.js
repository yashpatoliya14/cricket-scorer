const mongoose = require("mongoose");
const Match = require("../../models/Match");
const Player = require("../../models/Player");
const Team = require("../../models/Team");


//when match is finish then i call start second innings api

//when over completed the i call new bowler api     type of ball "bowlerChange"


// remaining ::::: playerlist add and history tracking and undo



// 🔹 Fetch Match and Team Data
const getMatchAndTeams = async (matchId) => {
    const match = await Match.findOne({ _id: new mongoose.Types.ObjectId(matchId) });
    if (!match) throw new Error("Match not found");

    const [bowlingTeam, battingTeam] = await Promise.all([
        Team.findOne({ _id: match.bowlingTeam }),
        Team.findOne({ _id: match.battingTeam }),
    ]);

    if (!bowlingTeam || !battingTeam) throw new Error("Teams not found");
    return { match, bowlingTeam, battingTeam };
};

// 🔹 Fetch Players
const getPlayers = async (battingTeam, bowlingTeam) => {
    const [batsman, bowler] = await Promise.all([
        Player.findById(battingTeam.currentStrickerBatsman),
        Player.findById(bowlingTeam.currentBowler),
    ]);

    if (!batsman || !bowler) throw new Error("Players not found");
    return { batsman, bowler };
};

// 🔹 Handle Wide Ball
const handleWideBall = (match, battingTeam, bowlingTeam) => {
    if (match.isWideRun) battingTeam.runsByTeam += 1;
    bowlingTeam.currentOver.push("WD");
};

// 🔹 Handle No Ball
const handleNoBall = (match, battingTeam, bowlingTeam, batsman, bowler, runs) => {
    if (match.isNoBall) battingTeam.runsByTeam += 1;
    bowlingTeam.currentOver.push("NB");
    batsman.playerRuns += runs;
    bowler.playerBowlingRuns += runs;
};

// 🔹 Handle Bye and Leg Bye
const handleBye = (bowlingTeam) => {
    bowlingTeam.currentBalls += 1;
    bowlingTeam.currentOver.push("BYE");
};

const handleLegBye = (bowlingTeam) => {
    bowlingTeam.currentBalls += 1;
    bowlingTeam.currentOver.push("LB");
};

// 🔹 Handle Runs
const handleRuns = (bowlingTeam, batsman, bowler, runs) => {
    bowlingTeam.currentBalls += 1;
    bowlingTeam.currentOver.push(runs.toString());
    batsman.playerRuns += runs;
    bowler.playerBowlingRuns += runs;
    batsman.StrikeRate = (batsman.playerRuns / batsman.playerBalls) * 100;
};

// 🔹 Handle Over Completion
const handleOverCompletion = (bowlingTeam, bowler) => {
    if (bowlingTeam.currentBalls === 6) {
        bowlingTeam.oversByTeam += 1;
        bowlingTeam.currentBalls = 0;
        bowlingTeam.currentOver = [];
        bowler.playerBowlingOvers += 1;
        bowler.BowlingEconomy = bowler.playerBowlingRuns / bowler.playerBowlingOvers;
    }
};

// 🔹 Update Bowler
const handleBowlerUpdate = async (bowlingTeam, newBowler) => {
    const existingBowler = await Player.findOne({playerName: newBowler})
    
    if(existingBowler){
        bowlingTeam.currentBowler = new mongoose.Types.ObjectId(existingBowler._id);    
    }else{
        if (newBowler) {
            const newBowlerObject = await Player.create({ playerName: newBowler });
            bowlingTeam.currentBowler = new mongoose.Types.ObjectId(newBowlerObject._id);
        }
    }

};

// 🔹 Update Batsman for Wicket
const handleWicketUpdate = async (batsman, bowler, bowlingTeam, newBatsman, battingTeam, wicketType) => {
    batsman.isOut = true;
    batsman.outType = wicketType;
    bowler.playerWickets += 1;
    bowlingTeam.wicketsByTeam += 1;
    bowlingTeam.currentOver.push("OUT");

    const newBatsmanObj = await Player.create({ playerName: newBatsman });
    battingTeam.currentStrickerBatsman = newBatsmanObj._id;
};

//match overs completed 
const isMatchOver =async (match , bowlingTeam,battingTeam)=>{
    if(battingTeam.oversByTeam === bowlingTeam.oversByTeam){
        match.isCompleted = true;
        await match.save()
    }
    
    if(match.totalOvers === bowlingTeam.oversByTeam){
        match.bowlingTeam = new mongoose.Types.ObjectId(battingTeam._id); 
        match.battingTeam = new mongoose.Types.ObjectId(bowlingTeam._id);    
        await match.save()
        return true;
    }
    return false;
}


const updateMatchState1 = async (req, res) => {
    const { typeOfBall, runs, newBowler, matchId } = req.body;

    try {
        // Fetch match, teams, and players
        const { match, bowlingTeam, battingTeam } = await getMatchAndTeams(matchId);
        const { batsman, bowler } = await getPlayers(battingTeam, bowlingTeam);
        const responseOfMatchOver = await isMatchOver(match,bowlingTeam,battingTeam)
        if(responseOfMatchOver){
            
            return res.status(400).json({ success: false, message: "Match innings Over" });
        }
        
        
        
        // Process ball type
        switch (typeOfBall) {
            case "wide":
                handleWideBall(match, battingTeam, bowlingTeam);
                break;
            case "noBall":
                handleNoBall(match, battingTeam, bowlingTeam, batsman, bowler, runs);
                break;
            case "bye":
                handleBye(bowlingTeam);
                break;
            case "legBye":
                handleLegBye(bowlingTeam);
                break;
            case "runs":
                handleRuns(bowlingTeam, batsman, bowler, runs);
                break;
            case "bowlerChange": 
                await handleBowlerUpdate(bowlingTeam, newBowler);
                break;
            default:
                return res.status(400).json({ success: false, message: "Invalid ball type" });
        }

        handleOverCompletion(bowlingTeam, bowler);
        if(!newBowler) battingTeam.runsByTeam += Number(runs);

        await Promise.all([bowlingTeam.save(), battingTeam.save(), batsman.save(), bowler.save()]);
        return res.status(200).json({ success: true });

    } catch (err) {
        console.error("Error in updateMatchState1:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


const updateMatchState2 = async (req, res) => {
    const { wicketType, newBatsman, matchId } = req.body;

    try {
        // Fetch match, teams, and players
        const { match, bowlingTeam, battingTeam } = await getMatchAndTeams(matchId);
        const { batsman, bowler } = await getPlayers(battingTeam, bowlingTeam);

        // Process wicket update
        await handleWicketUpdate(batsman, bowler, bowlingTeam, newBatsman, battingTeam, wicketType);
        bowlingTeam.currentBalls += 1;

        handleOverCompletion(bowlingTeam, bowler);

        await Promise.all([batsman.save(), bowler.save(), battingTeam.save(), bowlingTeam.save()]);
        return res.status(200).json({ success: true });

    } catch (err) {
        console.error("Error in updateMatchState2:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const startSecondInnings = async (req, res) => {
    try {
        const { matchId,newStrickerBatsman,newNonStrickerBatsman,  newBowler } = req.body;
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({ success: false, message: "Match not found" });
        }
        const [strickerBatsman, nonStrickerBatsman, bowler] = await Promise.all([
                    Player.create({ playerName: newStrickerBatsman }),
                    Player.create({ playerName: newNonStrickerBatsman }),
                    Player.create({ playerName: newBowler })
                ]);
        const battingTeam = await Team.findById(match.battingTeam);
        const bowlingTeam = await Team.findById(match.bowlingTeam);

        battingTeam.currentStrickerBatsman = new mongoose.Types.ObjectId(strickerBatsman._id);;
        battingTeam.currentNonStrickerBatsman = new mongoose.Types.ObjectId(nonStrickerBatsman._id);
        bowlingTeam.currentBowler = new mongoose.Types.ObjectId(bowler._id);
        await match.save();
        await battingTeam.save();
        await bowlingTeam.save();
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("Error in startSecondInnings:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    updateMatchState1,
    updateMatchState2,
    startSecondInnings
}




const { Mongoose, default: mongoose } = require("mongoose");
const Player = require("../../models/Player");
const Team = require("../../models/Team");
const Match = require("../../models/Match");

const createMatch = async (req, res) => {
    const {
        hostTeam,
        visitorTeam,
        tossWon,
        overs,
        isNoBall,
        noBallRun,
        isWideRun,
        wideRun,
        isBatFirst,
        noOfPlayerInTeam,
        currentStrickerBatsman,
        currentNonStrickerBatsman,
        currentBowler
    } = req.body;

    try {
        // Create players
        const [strickerBatsman, nonStrickerBatsman, bowler] = await Promise.all([
            Player.create({ playerName: currentStrickerBatsman }),
            Player.create({ playerName: currentNonStrickerBatsman }),
            Player.create({ playerName: currentBowler })
        ]);

        console.log(strickerBatsman, nonStrickerBatsman, bowler);

        // Determine batting & bowling teams based on toss
        const isHostBatting = tossWon.toString() === hostTeam.toString() && isBatFirst; 
 
        const teams = await Promise.all([
            Team.create({ 
                teamName: isHostBatting ? hostTeam : visitorTeam,
                noPlayers: noOfPlayerInTeam,
                currentStrickerBatsman:strickerBatsman._id,
                currentNonStrickerBatsman:nonStrickerBatsman._id,
                // playerList: [strickerBatsman._id, nonStrickerBatsman._id]
            }),
            Team.create({ 
                teamName: isHostBatting ? visitorTeam : hostTeam,
                noPlayers: noOfPlayerInTeam,
                currentBowler:bowler._id,
                // playerList: [bowler._id]
            })
        ])  
            
        // Create match
        const match = await Match.create({
            hostTeam:new mongoose.Types.ObjectId(teams[0]._id),
            visitorTeam:new mongoose.Types.ObjectId(teams[1]._id), 
            tossWon:new mongoose.Types.ObjectId(teams[isHostBatting ? 0 : 1]._id),
            battingTeam:new mongoose.Types.ObjectId(teams[isHostBatting ? 0 : 1]._id),
            bowlingTeam:new mongoose.Types.ObjectId(teams[isHostBatting ? 1 : 0]._id),
            totalOvers: overs,
            isNoBall,
            noBallRun,
            isWideRun, 
            wideRun
        });
        
            res.status(201).json(match);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating match' });
    }
};



module.exports = {createMatch}
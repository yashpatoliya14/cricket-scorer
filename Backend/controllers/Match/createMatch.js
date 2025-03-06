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
        choice,
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

        // Determine batting & bowling teams based on toss
        let batFirstTeam, bowlFirstTeam;  
        
        if(tossWon.toString() === hostTeam.toString()){
            if(choice==='bat'){
                batFirstTeam=hostTeam;
                bowlFirstTeam=visitorTeam;
            }else{
                batFirstTeam=visitorTeam;
                bowlFirstTeam=hostTeam;
            }
        }else{
            if(choice==='bat'){
                batFirstTeam=visitorTeam;
                bowlFirstTeam=hostTeam;
            }else{
                batFirstTeam=hostTeam;
                bowlFirstTeam=visitorTeam;
            }
        }


        const teams = await Promise.all([
            Team.create({ 
                teamName: batFirstTeam,
                noPlayers: noOfPlayerInTeam,
                currentStrickerBatsman:strickerBatsman._id,
                currentNonStrickerBatsman:nonStrickerBatsman._id,
                playerList: [new mongoose.Types.ObjectId(strickerBatsman._id), new mongoose.Types.ObjectId(nonStrickerBatsman._id)]
            }),
            Team.create({ 
                teamName: bowlFirstTeam,
                noPlayers: noOfPlayerInTeam,
                currentBowler:bowler._id,
                playerList: [new mongoose.Types.ObjectId(bowler._id)]
            })
        ])  
            
        // Create match
        const match = await Match.create({
            hostTeam:new mongoose.Types.ObjectId(teams[0]._id),
            visitorTeam:new mongoose.Types.ObjectId(teams[1]._id), 
            tossWon:new mongoose.Types.ObjectId(teams[tossWon.toString() === teams[0].teamName.toString() ? 0 : 1]._id),
            battingTeam:new mongoose.Types.ObjectId(teams[0]._id),
            bowlingTeam:new mongoose.Types.ObjectId(teams[1]._id),
            totalOvers: overs,
            isNoBall,
            noBallRun,
            isWideRun, 
            choice,
            wideRun
        });
        
            res.status(201).json(match);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating match' });
    }
};



module.exports = {createMatch}
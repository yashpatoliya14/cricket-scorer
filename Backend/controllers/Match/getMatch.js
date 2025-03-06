const Match = require("../../models/Match");

const getMatches = async (req,res)=>{
    try{

        try {
            const matches = await Match.find({})
                .populate("hostTeam",)  
                .populate("visitorTeam")
                .populate("tossWon") 
    
            if (matches.length > 0) {
                return res.json({ success: true, matches });
            } else {
                return res.json({ success: false, message: "No matches found" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Server error" });
        }

    }catch(err){
        console.log(err);
        
    }
    res.status(200).json({success:true})
}


module.exports = {getMatches}
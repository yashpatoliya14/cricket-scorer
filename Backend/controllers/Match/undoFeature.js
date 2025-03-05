const undoLastAction = async (req, res) => {
    try {
        const { matchId } = req.body;
        const match = await Match.findById(matchId);

        if (!match || match.history.length === 0) {
            return res.status(400).json({ success: false, message: "No actions to undo" });
        }

        const lastState = match.history.pop();
        const team = await Team.findById(match.currentTeam);

        if (!team) {
            return res.status(404).json({ success: false, message: "Team not found" });
        }

        // Restore last state
        team.runsByTeam = lastState.runsByTeam;
        team.wicketsByTeam = lastState.wicketsByTeam;
        team.currentOver = lastState.currentOver;

        await team.save();
        await match.save();

        return res.status(200).json({ success: true, message: "Undo successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

import { createSlice, current } from "@reduxjs/toolkit";


export const teamDetail = createSlice({
    initialState:{
        hostTeam:"",
        visitorTeam:"",
        tossWon:"",
        overs:0 ,
        choice:"",
        noOfPlayerInTeam:11,
        isNoBall:true,
        noBallRun:1,
        isWideRun:true,
        wideRun:1,
        currentStrickerBatsman:"",
        currentNonStrickerBatsman:"",
        currentBowler:""
    },
    name:"teamDetail",
    reducers:{
        addTeams(state,action){
            state.hostTeam = action.payload.hostTeam
            state.visitorTeam = action.payload.visitorTeam
        },
        addTossWinnerTeam(state,action){
            state.tossWon = action.payload.tossWon
        },
        addOvers(state,action){
            
            state.overs = action.payload.overs

        },
        addChoice(state,action){
            
            state.choice = action.payload.choice
            console.log(state.choice);
            
        },
        addPlayers(state,action){
            state.currentStrickerBatsman = action.payload.strickerBatsman
            state.currentNonStrickerBatsman = action.payload.nonStrickerBatsman
            state.currentBowler = action.payload.bowler
        }
    }

})

export const {addTeams,addTossWinnerTeam,addOvers,addChoice,addPlayers} = teamDetail.actions

export default teamDetail.reducer;
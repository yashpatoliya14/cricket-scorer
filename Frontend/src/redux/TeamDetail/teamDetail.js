import { createSlice } from "@reduxjs/toolkit";


export const teamDetail = createSlice({
    initialState:{
        hostTeam:"",
        visitorTeam:"",
        tossWon:"",
        overs:0,
        noOfPlayerInTeam:11,
        isNoBall:true,
        noBallRun:1,
        isWideRun:true,
        wideRun:1,
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
        }
    }

})

export const {addTeams,addTossWinnerTeam,addOvers} = teamDetail.actions

export default teamDetail.reducer;
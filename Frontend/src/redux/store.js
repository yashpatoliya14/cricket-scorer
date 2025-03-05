import {configureStore} from '@reduxjs/toolkit'
import teamDetail from './TeamDetail/teamDetail'

export const store = configureStore({
    reducer:{
        teamDetail:teamDetail   
    }
})


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios'
import { useSelector } from "react-redux";
const MatchesDisplay = () => {
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [matches,setMatches] = useState( [
        { id: 1, teamA: "India", teamB: "Australia", date: "2025-03-10", venue: "Mumbai" },
        { id: 2, teamA: "England", teamB: "South Africa", date: "2025-03-15", venue: "London" },
        { id: 3, teamA: "Pakistan", teamB: "New Zealand", date: "2025-03-20", venue: "Lahore" },
    ])
    const teams = useSelector((state) => state.teamDetail);
    useEffect(() => {
            
         axios.get(backend_url + '/v1/matches',{withCredentials: true})
        .then((response) => {
            if(response.data.success){
                setMatches(response.data.matches)
                console.log(response.data.matches);
                
            }
        })
    },[teams]);

    return (
        <motion.div
            className="p-8 flex flex-col items-center gap-4 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800">Matches</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-200">
                {matches.map((match) => (
                    <motion.div
                        key={match?.id}
                        className="p-4 border rounded-lg shadow-md bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800   w-80 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3 className="text-lg font-semibold">
                            {match.hostTeam?.teamName} <label htmlFor="vs" className="text-slate-900 bg-slate-300 rounded-4xl p-2 py-0 pb-0.5">v</label> {match.visitorTeam?.teamName}
                        </h3>
                        <p className="text-sm">Toss won by {match?.tossWon?.teamName===match.hostTeam?.teamName ? match.hostTeam?.teamName + ' choice to ' + match?.choice + ' first' : match.visitorTeam?.teamName + ' choice to ' + match?.choice + ' first'} </ p>
                        <p className="">overs :  {match.totalOvers}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};



export default MatchesDisplay



import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addTeams } from "../../redux/TeamDetail/teamDetail";
import TossTeam from "./TossTeam";

function TeamsInput({ isOpen, close, onSubmit,teamSetter }) {
    const teams = useSelector((state) => state.teamDetail);
    
    const [hostTeam, setHostTeam] = useState(teams.hostTeam);
    const [visitorTeam, setVisitorTeam] = useState(teams.visitorTeam);
    
    const dispatch = useDispatch();
    const handleSubmit = useCallback(() => {
        if (!hostTeam.trim()) return;
        if (!visitorTeam.trim()) return;
        dispatch(addTeams({hostTeam,visitorTeam}))
        onSubmit(true)
        close(); 
        
    }, [visitorTeam,hostTeam,onSubmit, close]);
    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-80"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <h2 className="text-xl font-semibold mb-4">Host Team</h2>
                <input
                    type="text"
                    className="w-full p-2 border rounded-md mb-4"
                    value={hostTeam}
                    onChange={(e) => setHostTeam(e.target.value)}
                    placeholder="Enter name"
                />
                <h2 className="text-xl font-semibold mb-4">Visitor Team</h2>
                <input
                    type="text"
                    className="w-full p-2 border rounded-md mb-4"
                    value={visitorTeam}
                    onChange={(e) => setVisitorTeam(e.target.value)}
                    placeholder="Enter name"
                />
                <div className="flex justify-end space-x-2">
                    <button 
                        className="px-4 py-2 bg-gray-400 text-white rounded-md"
                        onClick={close}
                    >
                        Cancel
                    </button>
                    <button 
                        className="px-4 py-2 bg-slate-900 text-white rounded-md"
                        onClick={handleSubmit}
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default TeamsInput;

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addTeams,addTossWinnerTeam } from "../redux/TeamDetail/teamDetail";


function TossTeam({ isOpen, close, onSubmit,previous }) {
    const dispatch = useDispatch();
    const teams = useSelector((state) => state.teamDetail);
    const [hostTeam, setHostTeam] = useState("");
    const [visitorTeam, setVisitorTeam] = useState("");
    const [tossWinner, setTossWinner] = useState(teams.tossWon); 

    useEffect(() => {
        if (teams) {
            setHostTeam(teams.hostTeam || "");
            setVisitorTeam(teams.visitorTeam || "");
            setTossWinner(teams.tossWon || ""); 
        }
    }, [teams, isOpen]);

    const handleSubmit = useCallback(() => {

        dispatch(addTossWinnerTeam({ tossWon: tossWinner }));
        onSubmit(true)
        close(false)
    }, [hostTeam, visitorTeam, tossWinner, dispatch, onSubmit, close]);

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
                <h2 className="text-xl font-semibold mb-4">Select Toss Winner</h2>

                {/* Host Team Input */}
                <h3 className="mb-2 font-semibold">Host Team</h3>
                <motion.div
                    whileTap={{ scale: 1.1 }}
                    className={`w-full text-center p-2 border rounded-md mb-2 cursor-pointer ${
                        tossWinner == hostTeam ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-300"
                    }`}
                    onClick={() => setTossWinner(hostTeam)}
                >
                    <input 
                        type="radio" 
                        id="host-option" 
                        name="tossWinnerTeam" 
                        className="hidden" />
                    <label htmlFor="host-option" className="p-5 text-slate-900 font-bold rounded-lg cursor-pointer hover:text-gray-600 peer-checked:text-gray-600 text-xl text-center">
                        {hostTeam.toString().toUpperCase()}
                    </label>
                </motion.div>

                {/* Visitor Team Input */}
                <h3 className="mb-2 font-semibold">Visitor Team</h3>
                <motion.div
                    whileTap={{ scale: 1.1 }}
                    className={`w-full text-center p-2 border rounded-md mb-2 cursor-pointer ${
                        tossWinner == visitorTeam ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-300"
                    }`}
                    onClick={() => setTossWinner(visitorTeam)}
                >
                    <input 
                        type="radio" 
                        id="visitor-option" 
                        name="tossWinnerTeam" 
                        className="hidden" />
                    <label htmlFor="visitor-option" className="p-5 text-slate-900 font-bold rounded-lg cursor-pointer hover:text-gray-600 peer-checked:text-gray-600 text-xl text-center">
                        {visitorTeam.toString().toUpperCase()}
                    </label>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded-md"
                        onClick={previous}
                    >
                        previous
                    </button>
                    <button
                        className="px-4 py-2 bg-slate-900 text-white rounded-md"
                        onClick={handleSubmit}
                        disabled={!tossWinner} // Disable if no winner is selected
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default TossTeam;

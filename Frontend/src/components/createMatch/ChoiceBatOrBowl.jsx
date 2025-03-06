import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addChoice, addTeams,addTossWinnerTeam } from "../../redux/TeamDetail/teamDetail";


function ChoiceBatOrBowl({ isOpen, close, onSubmit,previous }) {
    const dispatch = useDispatch();
    const [choice, setChoice] = useState(''); 

    
    const handleSubmit = useCallback(() => {

        dispatch(addChoice({ choice: choice }));
        console.log(choice);
        
        onSubmit(true)
        close(false)
    }, [  choice , onSubmit, close]);

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
                <h2 className="text-xl font-semibold mb-4">Select Choice</h2>

                <motion.div
                    whileTap={{ scale: 1.1 }}
                    className={`w-full text-center p-2 border rounded-md mb-2 cursor-pointer ${
                        choice == 'bat' ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-300"
                    }`}
                    onClick={() => setChoice('bat')}
                >
                    <input 
                        type="radio" 
                        id="host-option" 
                        name="tossWinnerTeam" 
                        className="hidden" />
                    <label htmlFor="host-option" className="p-5 text-slate-900 font-bold rounded-lg cursor-pointer hover:text-gray-600 peer-checked:text-gray-600 text-xl text-center">
                        BAT
                    </label>
                </motion.div>

                <motion.div
                    whileTap={{ scale: 1.1 }}
                    className={`w-full text-center p-2 border rounded-md mb-2 cursor-pointer ${
                        choice == 'bowl' ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-300"
                    }`}
                    onClick={() => setChoice('bowl')}
                >
                    <input 
                        type="radio" 
                        id="visitor-option" 
                        name="tossWinnerTeam" 
                        className="hidden" />
                    <label htmlFor="visitor-option" className="p-5 text-slate-900 font-bold rounded-lg cursor-pointer hover:text-gray-600 peer-checked:text-gray-600 text-xl text-center">
                        BOWL
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
                        disabled={!choice} 
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default ChoiceBatOrBowl;

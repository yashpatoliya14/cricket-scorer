import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addOvers, addTeams, addTossWinnerTeam } from "../redux/TeamDetail/teamDetail";

function Overs({ isOpen, close }) {
    const dispatch = useDispatch();
    const teams = useSelector(state=>state.teamDetail)
    const [overs, setOvers] = useState(teams.overs || 0);

    useEffect(() => {
        setOvers(teams.overs || 0);
    }, [teams.overs]);

    // Handles form submission
    const handleSubmit = useCallback(() => {
        console.log(overs);
        
        dispatch(addOvers({ overs:overs }));
        console.log(teams);
        
        
        
    }, [dispatch, close,overs,teams]);
    
    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-80 text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <h2 className="text-xl font-semibold mb-4">Select Toss Winner</h2>

                {/* overs Input */}
                <h3 className="mb-2 font-semibold">Overs</h3>
                <motion.div 
                    class="relative flex items-center max-w-[11rem] mx-auto">
                    
                    <motion.button 
                        onClick={()=>{
                            if(overs==1){
                                setOvers(1);
                            }else{
                                setOvers(prev=>prev-1)
                            }
                        }}
                        whileTap={{scale:0.9}}
                        type="button" id="decrement-button" data-input-counter-decrement="bedrooms-input" class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border  rounded-s-lg p-3 h-11 ">
                        <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                    </motion.button>
                    <input 
                        onChange={(e) => setOvers(Number(e.target.value) || 1)}
                        type="text" id="bedrooms-input" 
                        aria-describedby="helper-text-explanation" 
                        class="bg-gray-50 border-x-0  h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="" 
                        value={overs} 
                        required />
                    <div class="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                    <i class="fa-solid fa-bowling-ball"></i>
                        <span>Overs</span>
                    </div>
                    <motion.button
                        onClick={()=>{
                            if(overs==100){
                                setOvers(100);
                            }else{
                                setOvers(prev=>prev+1)
                            }
                        }}  
                        whileTap={{scale:0.9}}
                        type="button" id="increment-button" data-input-counter-increment="bedrooms-input" class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border  rounded-e-lg p-3 h-11 ">
                        <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </motion.button>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mt-4 ">
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded-md"
                        onClick={close}
                    >
                        previous
                    </button>
                    <button
                        className="px-4 py-2 bg-slate-900 text-white rounded-md"
                        onClick={handleSubmit} // Disable if no winner is selected
                    >
                        Save
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Overs;

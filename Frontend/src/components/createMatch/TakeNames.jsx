import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addChoice, addPlayers, addTeams, addTossWinnerTeam } from "../../redux/TeamDetail/teamDetail";
import axios from 'axios'

function TakeNames({ isOpen, close, previous }) {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
const dispatch = useDispatch();
const [stricker, setStricker] = useState('');
const [nonStricker, setNonStricker] = useState('');
const [bowler, setBowler] = useState('');
const [shouldCallAPI, setShouldCallAPI] = useState(false);

const teams = useSelector(state => state.teamDetail); // Get updated team details

const handleSubmit = useCallback(async () => {
    try {
        await dispatch(addPlayers({
            strickerBatsman: stricker,
            nonStrickerBatsman: nonStricker,
            bowler: bowler
        }));
        
        setShouldCallAPI(true);

        close(false);
    } catch (error) {
        console.error("Error updating players:", error);
    }
}, [bowler, stricker, nonStricker, close, dispatch]);

useEffect(() => {
    if (shouldCallAPI) {
        axios.post(backend_url + '/v1/createMatch', teams, { withCredentials: true })
            .then(response => {
                if (response.data.success) {
                    console.log("Match Created:", response.data);
                }
            })
            .catch(error => {
                console.error("Error creating match:", error);
            });

        setShouldCallAPI(false);
    }
}, [teams, shouldCallAPI]);

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


                <h2 className="text-xl font-semibold mb-4">Stricker Batsman</h2>
                <input
                    type="text"
                    className="w-full p-2 border rounded-md mb-4"
                    value={stricker}
                    onChange={(e) => setStricker(e.target.value)}
                    placeholder="Enter name"
                />
                <h2 className="text-xl font-semibold mb-4">Non-Stricker Batsman</h2>
                <input
                    type="text"
                    className="w-full p-2 border rounded-md mb-4"
                    value={nonStricker}
                    onChange={(e) => setNonStricker(e.target.value)}
                    placeholder="Enter name"
                />


                <h2 className="text-xl font-semibold mb-4">Bowler</h2>
                <input
                    type="text"
                    className="w-full p-2 border rounded-md mb-4"
                    value={bowler}
                    onChange={(e) => setBowler(e.target.value)}
                    placeholder="Enter name"
                />

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded-md"
                        onClick={previous}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 bg-slate-900 text-white rounded-md"
                        onClick={handleSubmit}
                        disabled={!stricker || !nonStricker || !bowler}
                    >
                        Create
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default TakeNames;

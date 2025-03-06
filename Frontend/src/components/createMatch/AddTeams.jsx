import React, { useState } from "react";
import { motion } from "framer-motion";
import TeamsInput from "./TeamsInput.jsx";
import TossTeam from "./TossTeam.jsx";
import Overs from "./Overs.jsx"
import ChoiceBatOrBowl from "./ChoiceBatOrBowl.jsx";
import TakeNames from "./TakeNames.jsx";
export default function AddTeams() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTossTeamOpen , setTossTeamOpen] = useState(false);
    const [isChoiceOpen , setChoiceOpen] = useState(false);
    const [isOversOpen,setIsOversOpen] = useState(false);
    const [isTakeNames,setIsTakeNames] = useState(false);
    return (
        <>
            <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="cursor p-4 px-5 md:p-5 md:px-6 bg-blue-200 rounded-full cursor-pointer  text-black absolute top-10/12 left-9/11 md:left-11/12"
            >
                <i className="fa-solid fa-plus"></i>
            </motion.button>

            <TeamsInput 
                isOpen={isModalOpen} 
                close={() => setIsModalOpen(false)} 
                onSubmit={setTossTeamOpen }  />
            <TossTeam 
                isOpen={isTossTeamOpen} 
                previous={()=>{

                    setTossTeamOpen(false)
                    setIsModalOpen(true)
                }}
                close={
                    setTossTeamOpen
                } 
                onSubmit={
                    setChoiceOpen
                }/>

            <ChoiceBatOrBowl 
                isOpen={isChoiceOpen} 
                close={setChoiceOpen} 
                previous={
                    ()=>{
                        setTossTeamOpen(true)
                        setChoiceOpen(false)
                    }
                } 
                onSubmit={setIsOversOpen}/>

            <Overs 
                isOpen={isOversOpen}
                previous={()=>{
                
                setChoiceOpen(true)
                setIsOversOpen(false)
                }
                }
                close={
                    setIsOversOpen
                }
                onSubmit={
                    setIsTakeNames
                }
            
            />
            <TakeNames 
                isOpen={isTakeNames} 
                close={setIsTakeNames}
                previous={
                    ()=>{
                        setIsOversOpen(true)
                        setIsTakeNames(false)
                    }
                }
                />
        
        </>
    );
}

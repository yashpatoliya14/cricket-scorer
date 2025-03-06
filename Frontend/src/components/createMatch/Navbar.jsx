import React, { useState,lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
const AddTeams = lazy(() => import("./AddTeams.jsx"));

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const menuVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };

    const categories = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Contact", path: "/contact" }
    ];

    return (
        <motion.div>

            <nav className="sticky top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="text-3xl font-bold">BrandName</div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8 text-lg">
                        {categories.map((category, index) => (
                            <Link key={index} to={category.path} className="hover:text-gray-400 transition-colors">{category.name}</Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md focus:outline-none">
                            <motion.div initial={false} animate={isOpen ? "open" : "closed"}>
                                <motion.div className="h-0.5 w-6 bg-white mb-1" animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} />
                                <motion.div className="h-0.5 w-6 bg-white" animate={isOpen ? { opacity: 0 } : { opacity: 1 }} />
                                <motion.div className="h-0.5 w-6 bg-white mt-1" animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} />
                            </motion.div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="md:hidden bg-gray-800 absolute w-full py-4 text-center"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={menuVariants}
                        >
                            {categories.map((category, index) => (
                                <Link key={index} to={category.path} className="block py-2 hover:text-gray-400" onClick={() => setIsOpen(false)}>{category.name}</Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            <AddTeams/>

        </motion.div>
    );
}

export default Navbar;
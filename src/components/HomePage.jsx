import { useHome } from "../context/HomeContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import heroBg from "../assets/header.jpg";
import etlImg from "../assets/etl.jpg";
import furnaceImg from "../assets/four.jpg";

const HomePage = () => {

    const navigate = useNavigate();

    return (
<>
        <div className="min-h-screen bg-gray-100">

          
            <div
                className="relative h-[70vh] flex items-center justify-center text-white"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative text-center px-6"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        SagemCom Private Dashboard
                    </h1>

                    <p className="text-lg text-gray-200 max-w-3xl mx-auto">
                        Centralized industrial platform for predictive maintenance,
                        automated ETL pipelines and production monitoring.
                    </p>
                </motion.div>
            </div>

        
            <div className="max-w-7xl mx-auto px-6 py-9">

                <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
                    Core Modules
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* ETL CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        onClick={() => navigate("/etl")}
                        className="relative group rounded-3xl overflow-hidden shadow-lg h-[350px]"
                    >
                        <img
                            src={etlImg}
                            className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* DARK OVERLAY ON HOVER */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/70 transition-all duration-500 backdrop-blur-0 group-hover:backdrop-blur-sm"></div>

                        {/* TEXT OVER IMAGE */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10">
                            <h3 className="text-2xl font-bold text-white group-hover:scale-105 transition">
                                ETL Automation
                            </h3>

                            <p className="text-gray-200 mt-3 opacity-0 group-hover:opacity-100 transition">
                                Automatic data extraction, transformation and injection into SQL Server.
                            </p>
                        </div>
                    </motion.div>

                    {/* FURNACE CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        onClick={() => navigate("/furnace")}
                        className="relative group rounded-3xl overflow-hidden shadow-lg h-[350px]"
                    >
                        <img
                            src={furnaceImg}
                            className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* DARK BLUR OVERLAY */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/70 transition-all duration-500 backdrop-blur-0 group-hover:backdrop-blur-sm"></div>

                        {/* TEXT OVER IMAGE */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10">
                            <h3 className="text-2xl font-bold text-white group-hover:scale-105 transition">
                                Furnace Risk Detection
                            </h3>

                            <p className="text-gray-200 mt-3 opacity-0 group-hover:opacity-100 transition">
                                AI detects divergence risk in furnace operations (normal vs anomaly).
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* FOOTER */}
            <div className="bg-gray-900 text-gray-300 py-6 text-center">
                <p>Smart Manufacturing Dashboard © 2026</p>
            </div>

        </div>
 </>
    );
};

export default HomePage;
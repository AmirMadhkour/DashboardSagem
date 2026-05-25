import { createContext, useContext, useState } from "react";

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {

    const [features] = useState([
        {
            id: 1,
            title: "AI Predictive Maintenance",
            description:
                "Detect machine failures before divergence happens using AI models.",
            icon: "🤖"
        },
        {
            id: 2,
            title: "Automated ETL Pipeline",
            description:
                "Automatically collect, clean and inject industrial data.",
            icon: "⚙️"
        },
        {
            id: 3,
            title: "Production Analytics",
            description:
                "Monitor scrap percentage, placement and production KPIs.",
            icon: "📊"
        },
        {
            id: 4,
            title: "Smart Alerts",
            description:
                "Receive anomaly alerts and predictive maintenance warnings.",
            icon: "🚨"
        }
    ]);

    return (
        <HomeContext.Provider value={{ features }}>
            {children}
        </HomeContext.Provider>
    );
};

export const useHome = () => useContext(HomeContext);
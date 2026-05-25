// context/ETLContext.jsx
import { createContext, useContext, useMemo } from "react";

const ETLContext = createContext();

const ARTICLES = [
    "STT0456893", "LKYZ501911", "LKYZ501552", "LKYZ501453",
    "LKYZ501242", "LKYZ501148", "LKY0526114", "LKY0479346", "191287902"
];

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate all dates of a given year (Jan 1 to Dec 31)
const generateFullYearDates = (year = 2026) => {
    const dates = [];
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    let current = new Date(start);
    while (current <= end) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
    }
    return dates;
};

export const ETLProvider = ({ children }) => {
    const etlData = useMemo(() => {
        const dates = generateFullYearDates(2026);
        const data = [];
        dates.forEach(date => {
            ARTICLES.forEach(article => {
                data.push({
                    date,
                    partNumber: article,
                    scrap: random(400, 1200)
                });
            });
        });
        return data;
    }, []);

    return (
        <ETLContext.Provider value={{ etlData }}>
            {children}
        </ETLContext.Provider>
    );
};

export const useETL = () => useContext(ETLContext);
// components/ETLComponent.jsx
import { useState, useMemo } from "react";
import { useETL } from "../context/ETLContext";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from "recharts";
import { Card, Typography, Box, Chip } from "@mui/material";

const COLORS = [
    "#2563eb", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6",
    "#06b6d4", "#e11d48", "#22c55e", "#64748b", "#a855f7"
];

const ETLComponent = () => {
    const { etlData } = useETL();
    const [hidden, setHidden] = useState([]);

    const toggleLine = (key) => {
        setHidden(prev =>
            prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key]
        );
    };

    // Process data: fill missing days (should have all, but safe)
    const { chartData, partsList } = useMemo(() => {
        if (!etlData?.length) return { chartData: [], partsList: [] };

        const allParts = [...new Set(etlData.map(item => item.partNumber))];
        const dateMap = new Map();

        // Generate all days in the data's year
        const firstDate = new Date(etlData[0].date);
        const year = firstDate.getFullYear();
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31);
        let cur = new Date(start);
        while (cur <= end) {
            const dateStr = cur.toISOString().split("T")[0];
            const entry = { date: dateStr };
            allParts.forEach(p => entry[p] = 0);
            dateMap.set(dateStr, entry);
            cur.setDate(cur.getDate() + 1);
        }

        // Fill actual scrap
        etlData.forEach(({ date, partNumber, scrap }) => {
            if (dateMap.has(date)) {
                dateMap.get(date)[partNumber] += scrap;
            }
        });

        const result = Array.from(dateMap.values());
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { chartData: result, partsList: allParts };
    }, [etlData]);

    if (!chartData.length) {
        return (
            <Box className="p-6 bg-gray-100 min-h-screen">
                <Card className="p-6 rounded-2xl">
                    <Typography variant="h6">No data available</Typography>
                </Card>
            </Box>
        );
    }

    return (
        <Box className="p-6 bg-gray-100 min-h-screen">
            <Card className="p-6 mb-6 rounded-2xl shadow-lg">
                <Typography variant="h4" fontWeight="bold">
                    ETL Production Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Total Scrap per Article • Daily points + lines • Full year (scroll horizontally)
                </Typography>
                <Box className="flex gap-2 mt-3 flex-wrap">
                    <Chip label="Jan 1 → Dec 31" color="primary" />
                    <Chip label="Points + Lines" color="error" />
                    <Chip label="Scrollable" variant="outlined" />
                </Box>
            </Card>

            <Card className="p-4 rounded-2xl shadow-lg">
                <Typography variant="h6" fontWeight="bold" className="mb-3">
                    📈 Daily Scrap Trend
                </Typography>

                {/* FIXED WIDTH CONTAINER with horizontal scroll */}
                <Box sx={{ width: "100%", overflowX: "auto" }}>
                    <Box sx={{ width: 1100, height: 450 }}>  {/* 👈 FIXED WIDTH, scroll inside */}
                        <LineChart
                            width={1100}
                            height={450}
                            data={chartData}
                            margin={{ top: 20, right: 50, left: 20, bottom: 60 }}
                        >
                            <CartesianGrid stroke="#e5e7eb" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 10, angle: -45, textAnchor: "end" }}
                                height={70}
                                interval={Math.floor(chartData.length / 15)}  // show ~15 ticks
                            />
                            <YAxis label={{ value: "Scrap", angle: -90, position: "insideLeft" }} />
                            <Tooltip
                                formatter={(val, name) => [`${val} scraps`, name]}
                                labelFormatter={label => `Date: ${label}`}
                            />
                            <Legend
                                onClick={(e) => toggleLine(e.dataKey)}
                                wrapperStyle={{ fontSize: "12px" }}
                                verticalAlign="top"
                                height={50}
                            />
                            {partsList.map((part, idx) => (
                                <Line
                                    key={part}
                                    type="linear"
                                    dataKey={part}
                                    name={part}
                                    stroke={COLORS[idx % COLORS.length]}
                                    strokeWidth={2}
                                    dot={{ r: 2.5, strokeWidth: 1 }}
                                    activeDot={{ r: 5 }}
                                    hide={hidden.includes(part)}
                                />
                            ))}
                        </LineChart>
                    </Box>
                </Box>

                <Typography variant="caption" color="text.secondary" className="mt-3 block text-center">
                    ✅ Each point = total scrap that day.<br />
                    ✅ Lines connect daily values.<br />
                    ✅ Scroll horizontally (→) to see all 365 days.<br />
                    ✅ Click legend to hide/show articles.
                </Typography>
            </Card>
        </Box>
    );
};

export default ETLComponent;
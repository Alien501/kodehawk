import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface AnalysisGraphProps {
    data: {
        subject: string;
        A: number; 
        B: number; 
        fullMark: number;
    }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-zinc-950 border border-white/10 p-3 shadow-xl backdrop-blur-md">
                <p className="text-zinc-400 text-[10px] uppercase tracking-widest mb-2 font-mono">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-none" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs text-white font-mono">
                            {entry.name === 'A' ? 'CURRENT' : 'POTENTIAL'}: <span className="font-bold">{entry.value}</span>
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function AnalysisGraph({ data }: AnalysisGraphProps) {
    return (
        <div className="w-full h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#3f3f46" strokeDasharray="3 3" />
                    <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'monospace' }} 
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    
                    <Radar
                        name="A"
                        dataKey="A"
                        stroke="#ffffff"
                        strokeWidth={2}
                        fill="#ffffff"
                        fillOpacity={0.1}
                    />
                    <Radar
                        name="B"
                        dataKey="B"
                        stroke="#52525b"
                        strokeWidth={1}
                        strokeDasharray="4 4"
                        fill="transparent"
                        fillOpacity={0}
                    />
                    
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Legend 
                        wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontFamily: 'monospace' }}
                        formatter={(value) => <span className="text-zinc-500 uppercase tracking-widest ml-2">{value === 'A' ? 'Current Score' : 'Potential'}</span>}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

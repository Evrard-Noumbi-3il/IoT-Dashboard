import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer  } from 'recharts';

const Graph = ({ data, dataKey, label, color }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.18)',
      borderRadius: '20px',
      padding: '1.5rem',
      flex: '1 1 400px',
      margin: '0.5rem',
      minHeight: '250px',
      transition: 'all 0.3s ease'
    }}>
      <h3 style={{ 
        color: '#fff', 
        marginBottom: '1rem',
        fontSize: '1rem',
        fontWeight: '600',
        letterSpacing: '0.5px'
      }}>{label}</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" hide />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{
              background: 'rgba(0,0,0,0.8)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff'
            }}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color}
            strokeWidth={3}
            dot={false}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;

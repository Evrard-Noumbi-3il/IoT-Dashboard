import React from 'react';

const SensorCard = ({ label, value, unit, icon: Icon, color }) => {
  return (
    <div className="sensor-card" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.18)',
      borderRadius: '20px',
      padding: '1.5rem',
      minWidth: '200px',
      flex: '1 1 200px',
      margin: '0.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = `0 20px 40px ${color}33`;
      e.currentTarget.style.borderColor = color;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
    }}>
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '150px',
        height: '150px',
        background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', position: 'relative' }}>
        <div style={{
          background: `${color}22`,
          borderRadius: '12px',
          padding: '0.6rem',
          marginRight: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={24} color={color} />
        </div>
        <span style={{ 
          color: 'rgba(255,255,255,0.7)', 
          fontSize: '0.9rem',
          fontWeight: '500',
          letterSpacing: '0.5px'
        }}>{label}</span>
      </div>
      
      <div style={{ position: 'relative' }}>
        <span style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700',
          color: '#fff',
          lineHeight: '1',
          textShadow: `0 0 20px ${color}66`
        }}>
          {value || '--'}
        </span>
        <span style={{ 
          fontSize: '1.1rem', 
          color: color,
          marginLeft: '0.5rem',
          fontWeight: '600'
        }}>
          {unit}
        </span>
      </div>
    </div>
  );
};

export default SensorCard;

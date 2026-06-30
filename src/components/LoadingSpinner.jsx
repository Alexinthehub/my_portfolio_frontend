const LoadingSpinner = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#02060E',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        border: '4px solid rgba(93, 214, 44, 0.1)',
        borderTop: '4px solid #5DD62C',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        boxShadow: '0 0 40px rgba(93, 214, 44, 0.3)',
      }} />
    </div>
  );
};

export default LoadingSpinner;
// src/pages/Test.jsx
const Test = () => {
  console.log('✅ TEST PAGE LOADED!');
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#5DD62C',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ fontSize: '48px', color: 'white' }}>🎉 TEST PAGE</h1>
      <p style={{ color: '#0F0F0F', fontSize: '20px' }}>If you see this, React Router is working!</p>
      <a href="/" style={{ color: 'white', fontSize: '18px', marginTop: '20px' }}>Go Home</a>
    </div>
  );
};

export default Test;
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Trying another port...`);
    const newPort = PORT + 1;
    app.listen(newPort, () => {
      console.log(`User Service is running on port ${newPort}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
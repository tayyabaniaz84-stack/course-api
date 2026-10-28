require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Database ready (file storage in ./data)');
  console.log(`Server running on http://localhost:${PORT}`);
});

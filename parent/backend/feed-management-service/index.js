const express = require('express');
const app = express();
const port = process.env.PORT || 3007;

app.get('/', (req, res) => {
  res.send('Hello from feed-management-service!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

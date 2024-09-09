#!/bin/bash

SERVICE_NAME=$1

if [ -z "$SERVICE_NAME" ]; then
  echo "Please provide a service name."
  exit 1
fi

mkdir -p parent/backend/$SERVICE_NAME
cd parent/backend/$SERVICE_NAME

# Initialize Node.js project
npm init -y

# Install Express
npm install express

# Create a basic server file
cat <<EOL > index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from $SERVICE_NAME!');
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
EOL

echo "$SERVICE_NAME microservice initialized."


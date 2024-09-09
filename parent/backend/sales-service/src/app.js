const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const swaggerFile = require('./config/swagger-output.json'); // Generated JSON file




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI;
console.log("Mongo URL : ",MONGO_URI);
// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
//const productionRoutes = require('./routes/production');
const salesRoutes = require('./routes/sales');
/*const expenseRoutes = require('./routes/expenses');
const userRoutes = require('./routes/user');
const damageRoutes = require('./routes/damageRoutes');
const feedRoutes =  require('./routes/feedRoutes');*/

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use routes
//app.use('/api/production', productionRoutes);
app.use('/api/sales', salesRoutes);
/*app.use('/api/expense', expenseRoutes);
app.use('/api/user', userRoutes);
app.use('/api/damage', damageRoutes);
app.use('/api/feed', feedRoutes);*/

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

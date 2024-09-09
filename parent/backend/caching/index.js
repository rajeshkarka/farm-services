const redis = require('redis');

// Create a Redis client
const client = redis.createClient({
  url: 'redis://caching:6379' // Redis URL, where 'caching' is the name of the Redis service defined in your docker-compose.yaml file
});

// Connect to Redis
client.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Redis connection error:', err));

// Function to set a value in the cache
async function setCache(key, value, expiration = 3600) {
  try {
    await client.setEx(key, expiration, value); // Set key with an expiration time
    console.log(`Key "${key}" set with value "${value}" and expiration of ${expiration} seconds.`);
  } catch (err) {
    console.error('Error setting cache:', err);
  }
}

// Function to get a value from the cache
async function getCache(key) {
  try {
    const value = await client.get(key);
    console.log(`Retrieved value for key "${key}":`, value);
    return value;
  } catch (err) {
    console.error('Error getting cache:', err);
    return null;
  }
}

// Example Usage
(async () => {
  await setCache('testKey', 'testValue');
  await getCache('testKey');
})();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await client.quit();
  console.log('Redis client disconnected');
  process.exit(0);
});

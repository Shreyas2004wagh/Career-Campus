// Simple test script to verify that the proxy server is working correctly
const http = require('http');

const testData = {
  name: 'Test User',
  interests: 'coding, reading',
  skills: 'JavaScript (4), Python (3)',
  goals: 'Become a full-stack developer'
};

const options = {
  hostname: 'localhost',
  port: 5500,
  path: '/api/test',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(testData))
  }
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Headers:', res.headers);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response data:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(JSON.stringify(testData));
req.end(); 
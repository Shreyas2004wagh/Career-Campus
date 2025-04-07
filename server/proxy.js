const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 5500; // Same port as your client

// Parse JSON bodies
app.use(express.json());

// Test endpoint to verify the proxy server is working
app.post('/api/test', (req, res) => {
  console.log('Test endpoint hit with data:', req.body);
  res.json({ message: 'Proxy server is working correctly', receivedData: req.body });
});

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Specific middleware for the career options endpoint
app.post('/api/get-career-options', (req, res, next) => {
  console.log('Received POST request to /api/get-career-options:', req.body);
  // Forward the request to the main server
  const proxy = createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // Remove /api prefix when forwarding
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error: ' + err.message);
    },
    logLevel: 'debug'
  });
  
  proxy(req, res, next);
});

// Proxy all other API requests to the main server
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error: ' + err.message);
  },
  // Log requests for debugging
  logLevel: 'debug'
}));

// Serve the assessment.html file for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/assessment.html'));
});

// Serve the client's index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/assessment.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Serving assessment.html as the default page`);
  console.log(`Proxying API requests to http://localhost:3000`);
}); 
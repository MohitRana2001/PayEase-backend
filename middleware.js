// middleware.js
export default function middleware(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
  
    if (token) {
      fetch('/api/auth/verifyToken', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
      .then(response => response.json())
      .then(data => {
        if (data.valid) {
          req.userId = data.user.userId; 
          next();
        } else {
          res.status(401).json({ message: 'Unauthorized' });
        }
      })
      .catch(error => {
        console.error('Error verifying token:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
    } else {
      next(); 
    }
  }
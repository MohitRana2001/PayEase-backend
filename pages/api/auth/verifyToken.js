import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { token } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ valid: true, user: decoded }); 
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(401).json({ valid: false, message: 'Invalid token' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
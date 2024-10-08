import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { userId } = req.body; 
      const token = jwt.sign({ userId }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).json({ message: 'Failed to generate token' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
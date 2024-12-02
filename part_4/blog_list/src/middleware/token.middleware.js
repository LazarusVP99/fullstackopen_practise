import jwt from 'jsonwebtoken';

import { config } from '../utils/index.js';

const accessToken = (req, _res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = (req, res, next) => {
  try {
    if (!req.token) {
      return res.status(401).json({ error: 'token missing' });
    }

    const decodedToken = jwt.verify(req.token, config.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'invalid token' });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'invalid token or unauthorized' });
  }
};

export default { accessToken, userExtractor };

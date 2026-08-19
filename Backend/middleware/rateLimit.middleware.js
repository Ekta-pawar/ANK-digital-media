const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 20;

const requestLog = new Map();

const authRateLimiter = (req, res, next) => {
  const key = req.ip;
  const now = Date.now();

  const timestamps = (requestLog.get(key) || []).filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many requests, please try again later",
    });
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);

  next();
};

export default authRateLimiter;

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const header = req.headers.authorization;
	if (!header) return res.status(400).json({ result: 'Token is required' });
	const token = header.split(' ')[1];
	const userVerified = jwt.verify(token, process.env.JWT_SECRET);
	req.user = userVerified;
	next();
};

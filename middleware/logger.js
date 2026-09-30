function logger(req, res, next) {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const date = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

    console.log(`${req.method} | ${req.originalUrl} | ${date} ${time}`);
    next();
}

module.exports = logger;

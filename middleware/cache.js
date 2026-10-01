const cache = {};
const TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;
    const cached = cache[key];
    if (cached) {
        const age = Date.now() - cached.createdAt;
        if (age < TTL) {
            res.setHeader("X-Cache", "HIT");
            return res.json(cached.data);
        }
        delete cache[key];
    }
    res.setHeader("X-Cache", "MISS");
    const originalJson = res.json.bind(res);
    res.json = (data) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache[key] = {
                data: data,
                createdAt: Date.now()
            };
        }
        return originalJson(data);
    };

    next();
}


function invalidateCache(req, res, next) {

    res.on("finish", () => {

        if (res.statusCode >= 200 && res.statusCode < 300) {
            Object.keys(cache).forEach((key) => {
                delete cache[key];
            });
            console.log("Cache invalidated");
        }
    });

    next();
}

module.exports = {
    cacheMiddleware,
    invalidateCache
};
const errorsCaseHandler = (error, res) => {
    switch (error.name) {
        case 'ValidationError':
            return res.status(400).json({ error: error.message });
        case 'MongoServerError':
            return res.status(400).json({ error: 'Name must be unique' });
        case 'CastError':
            return res.status(400).json({ error: 'Malformatted ID' });
        default:
            return res.status(500).json({ error: 'Something went wrong' });
    }
};

const errorMiddlewareHandler = (error, _req, res, _next) => {
    console.error(error.message);
    return errorsCaseHandler(error, res);
};

export default errorMiddlewareHandler;

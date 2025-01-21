import jsonServer from 'json-server';

const { defaults, create } = jsonServer;

const server = create();
const router = jsonServer.router('db.json');
const middlewares = defaults();

const validator = (request, response, next) => {
    if (request.method !== 'POST') return next();

    const { content } = request.body;
    const MIN_LENGTH = 5

    if (!content || content.length < MIN_LENGTH) {
        return response.status(400).json({
            error: `too short anecdote, must have length ${MIN_LENGTH} or more`
        })
    }

    next()
}
server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(validator)
server.use(router)

server.listen(3001, () => console.log('JSON Server is running'))
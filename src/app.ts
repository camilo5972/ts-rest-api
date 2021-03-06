import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import * as bodyParser from 'body-parser';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

const app = express();

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
	res.header('Allow', 'GET, POST, PUT, OPTIONS');
	next();
});
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(cors());

app.use('/api/v1', routes);

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
        return 'Hello world!';
    },
};

app.use('/api/v1/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

export { app };
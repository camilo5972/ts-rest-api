import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { Router } from 'express';

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

const graphqlRouter = Router();

graphqlRouter.get('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

export default graphqlRouter;
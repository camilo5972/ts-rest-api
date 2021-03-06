import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import * as bodyParser from 'body-parser';

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
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(helmet.hidePoweredBy());
app.use(cors());

app.use('/api/v1', routes);

export { app };
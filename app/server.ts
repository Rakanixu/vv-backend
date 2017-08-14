import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import { ICustomRequest } from './utils/custom.types';
import * as routes from './routes';
import * as auth from './auth';

export class Server {
    public app: express.Express;
    public io: any;

    public initialize(): Promise<express.Application> {
        // create express instance
        this.app = express();

        // configure application
        this.applyConfig();

        // add routes
        routes.setupRoutes(this.app);

        return Promise.resolve(this.app);
    }

    private applyConfig() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.use(cookieParser());
        this.app.use(methodOverride());
        this.app.use(express.static(__dirname + '/static'));
        this.app.use((req: ICustomRequest, res: express.Response, next: Function) => {
            if (req.header('Origin') !== undefined && req.header('Origin').toLowerCase().indexOf('40.68.174.239') > -1) {
                res.header('Access-Control-Allow-Origin', req.header('Origin').toLowerCase());
            } else {
                res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            }
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Origin, Credentials, X-Requested-With, Content-Type, Accept, Authorization');

            if (req.method === 'OPTIONS') {
                res.end();
            } else {
                next();
            }
        });

        const env = process.env.NODE_ENV || 'development';
        if (env === 'development') {
            this.app.use(errorHandler());
            this.app.use(morgan('dev'));
        } else if (env === 'test') {
            this.app.use(errorHandler());
        } else {
            this.app.use(morgan('common'));
        }

        // authentication configuration
        auth.configure(this);
    }
}

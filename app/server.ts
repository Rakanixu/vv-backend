import * as express from 'express';
import * as cors from 'cors';
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
    public iosecure: any;

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
        const corsOptions = {
            origin: function (origin: any, callback: any) {
                callback(null, true);
            },
            credentials: true
        };

        this.app.use(cors(corsOptions));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.use(cookieParser());
        this.app.use(methodOverride());
        this.app.use(express.static(__dirname + '/static'));

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

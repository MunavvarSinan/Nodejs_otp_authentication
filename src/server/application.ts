import express, { Request, Response } from 'express';
import cors from 'cors';
import { Server } from 'http';
import { connect } from './database';

import user from '../app/routes/user.routes';

export default class Application {
  public app: express.Application;
  public server: Server;

  /** ----- Database connection ----- */
  public connect = async (): Promise<void> => {
    try {
      connect();
    } catch (err) {
      console.error('📌 Could not connect to the database', err);
      throw Error(err);
    }
  };
  /** ----- Server intializing ----- */
  public init = async (): Promise<void> => {
    this.app = express();
    this.app.use(cors());
    try {
      this.app.use(express.json());
      this.app.get('/', (req: Request, res: Response) =>
        res.json({
          message: 'Welcome to Nodejs api authentication',
        }),
      );
      this.app.use('/api/user', user);
      const port = process.env.PORT || 4000;
      this.server = this.app.listen(port, () => {
        console.log(`server started on localhost:${port}`);
      });
    } catch (error) {
      console.error('📌 Could not start server', error);
    }
  };
}

import { Request, Response, NextFunction } from 'express';

class Test {

    constructor() {}

    sayHello(req: Request, res: Response, next: NextFunction) {
        return res.json('HELLO');
    }
}

export default new Test();
import {Request, Response, NextFunction } from 'express';
import express from 'express'
import path from 'path';
import cors from 'cors';


import { router } from './routes';

// const port = process.env.PORT || 3001


const app = express();

// const cors = require('cors')

app.use(express.json());
app.use(cors()); //habilitando p/ qualquer IP/URL fazer requisição nessa API

app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)


app.use((err: Error, req: Request, res: Response, next: NextFunction)=> {

    if(err instanceof Error){
        //Se for uma instância do tipo error
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})


app.listen(process.env.PORT || 3000, () => console.log('server on'))


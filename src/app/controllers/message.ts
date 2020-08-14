import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/message';
import { database } from '../../lib/database';
import { Table } from '../../lib/table';
import messageSerializer from '../serializers/message';

export default {
    // authorization: (req: Request, res: Response, next: NextFunction) => {
    //     next();
    // },

    index: async (req: Request, res: Response) => {
        try {
            const messages: Array<Message> = await database(Table.messages).select();
            res.status(200).json(messageSerializer.index(messages));
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    show: async (req: Request, res: Response) => {
        try {
            const message: Message = await database(Table.messages).where({ id: req.params.id }).first();
            if (message) {
                res.status(200).json(messageSerializer.show(message));
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const message: Partial<Message> = {
                title: req.body.title,
                content: req.body.content
            };
            await database(Table.messages).insert(message);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const message: Message = await database(Table.messages).where({ id: req.params.id }).first();
            if (message) {
                const updatedMessage: Partial<Message> = {
                    title: req.body.title,
                    content: req.body.content
                };
                await database(Table.messages)
                    .where({ id: req.params.id })
                    .update(updatedMessage);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    destroy: async (req: Request, res: Response) => {
        try {
            const message: Message = await database(Table.messages).where({ id: req.params.id }).first();
            if (message) {
                await database(Table.messages)
                    .where({ id: req.params.id })
                    .delete();
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
};

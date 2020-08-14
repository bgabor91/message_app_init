import { Request, Response, NextFunction } from 'express';
import { Group } from '../models/group';
import { database } from '../../lib/database';
import { Table } from '../../lib/table';
import groupSerializer from '../serializers/group';

export default {

    index: async (req: Request, res: Response) => {
        try {
            const groups: Array<Group> = await database(Table.groups).select();
            res.status(200).json(groupSerializer.index(groups));
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    show: async (req: Request, res: Response) => {
        try {
            const group: Group = await database(Table.groups).where({ id: req.params.id }).first();
            if (group) {
                res.status(200).json(groupSerializer.show(group));
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
            const group: Partial<Group> = {
                name: req.body.name,
                members: req.body.members
            };
            await database(Table.groups).insert(group);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const group: Group = await database(Table.groups).where({ id: req.params.id }).first();
            if (group) {
                const updatedGroup: Partial<Group> = {
                    name: req.body.name,
                    members: req.body.members
                };
                await database(Table.groups)
                    .where({ id: req.params.id })
                    .update(updatedGroup);
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
            const group: Group = await database(Table.groups).where({ id: req.params.id }).first();
            if (group) {
                await database(Table.groups)
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

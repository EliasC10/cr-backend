import { Router } from 'express';
import { getMultiple, create, update, remove } from '../services/customerService.js';

const customerRouter = Router();

/* GET customers. */
customerRouter.get('/', async function (req, res, next) {
  try {
    res.json(await getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting customers `, err.message);
    next(err);
  }
});

/* POST customers. */
customerRouter.post('/', async function (req, res, next) {
  try {
    res.json(await create(req.body));
  } catch (err) {
    console.error(`Error while creating customer`, err.message);
    next(err);
  }
});

/* PUT customers. */
customerRouter.put('/:id', async function (req, res, next) {
  try {
    res.json(await update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating customer`, err.message);
    next(err);
  }
});

/* DELETE programming language */
customerRouter.delete('/:id', async function (req, res, next) {
  try {
    res.json(await remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting customer`, err.message);
    next(err);
  }
});

export default customerRouter;
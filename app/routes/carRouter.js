import { Router } from 'express';
import { getMultiple, create, update, remove } from '../services/carService.js';

const carRouter = Router();

/* GET cars. */
carRouter.get('/', async function (req, res, next) {
  try {
    res.json(await getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting car `, err.message);
    next(err);
  }
});

/* POST cars. */
carRouter.post('/', async function (req, res, next) {
  try {
    res.json(await create(req.body));
  } catch (err) {
    console.error(`Error while creating cars`, err.message);
    next(err);
  }
});

/* PUT cars. */
carRouter.put('/:id', async function (req, res, next) {
  try {
    res.json(await update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating cars`, err.message);
    next(err);
  }
});

/* DELETE programming language */
carRouter.delete('/:id', async function (req, res, next) {
  try {
    res.json(await remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting cars`, err.message);
    next(err);
  }
});

export default carRouter;
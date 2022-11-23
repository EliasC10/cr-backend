import { Router } from 'express';
import { getMultiple, create, update, remove } from '../services/rentalService.js';

const rentalRouter = Router();

/* GET rental. */
rentalRouter.get('/', async function (req, res, next) {
  try {
    res.json(await getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting rental `, err.message);
    next(err);
  }
});

/* POST rental. */
rentalRouter.post('/', async function (req, res, next) {
  try {
    res.json(await create(req.body));
  } catch (err) {
    console.error(`Error while creating rental`, err.message);
    next(err);
  }
});

/* PUT rental. */
rentalRouter.put('/:id', async function (req, res, next) {
  try {
    res.json(await update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating rental`, err.message);
    next(err);
  }
});

/* DELETE programming language */
rentalRouter.delete('/:id', async function (req, res, next) {
  try {
    res.json(await remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting rental`, err.message);
    next(err);
  }
});

export default rentalRouter;
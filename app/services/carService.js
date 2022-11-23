import { query } from './db.js';
import { getOffset, emptyOrRows } from '../helper.js';
import { config } from '../config.js';

export async function getMultiple(page = 1) {
  const offset = getOffset(page, config.listPerPage);
  const rows = await query(
    `SELECT id, name, kilometers, available FROM cars LIMIT ${offset},${config.listPerPage}`
  );
  const data = emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

export async function create(car) {
  const result = await query(
    `INSERT INTO cars (name, kilometers, available) 
    VALUES ("${car.name}", "${car.kilometers}", "${car.available}")`
  );

  let message = 'Error in creating car';

  if (result.affectedRows) {
    message = 'car created successfully';
  }

  return { message };
}

export async function update(id, car) {
  const result = await query(
    `UPDATE cars SET name="${car.name}", kilometers="${car.kilometers}", available="${car.available}" WHERE id=${id}`
  );

  let message = 'Error in updating car';

  if (result.affectedRows) {
    message = 'car updated successfully';
  }

  return { message };
}

export async function remove(id) {
  const result = await query(
    `DELETE FROM cars WHERE id=${id}`
  );

  let message = 'Error in deleting car';

  if (result.affectedRows) {
    message = 'car deleted successfully';
  }

  return { message };
}
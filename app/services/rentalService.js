import { query } from './db.js';
import { getOffset, emptyOrRows } from '../helper.js';
import { config } from '../config.js';

export async function getMultiple(page = 1) {
  const offset = getOffset(page, config.listPerPage);
  const rows = await query(
    `SELECT id, customer_id, car_id, kilometers FROM rental LIMIT ${offset},${config.listPerPage}`
  );
  const data = emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

export async function create(rental) {
  const result = await query(
    `INSERT INTO rental (customer_id, car_id, kilometers) 
    VALUES ("${rental.customerId}", "${rental.carId}", "${rental.kilometers}")`
  );

  let message = 'Error in creating rental';

  if (result.affectedRows) {
    message = 'rental created successfully';
  }

  return { message };
}

export async function update(id, rental) {
  const result = await query(
    `UPDATE rental SET customer_id="${rental.customerId}", car_id="${rental.carId}", kilometers="${rental.kilometers}" WHERE id=${id}`
  );
  let message = 'Error in updating rental';

  if (result.affectedRows) {
    message = 'rental updated successfully';
  }

  return { message };
}

export async function remove(id) {
  const result = await query(
    `DELETE FROM rental WHERE id=${id}`
  );

  let message = 'Error in deleting rental';

  if (result.affectedRows) {
    message = 'rental deleted successfully';
  }

  return { message };
}
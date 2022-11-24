import { query } from './db.js';
import { getOffset, emptyOrRows } from '../helper.js';
import { config } from '../config.js';

export async function getMultiple(page = 1) {
  const offset = getOffset(page, config.listPerPage);
  const rows = await query(
    `SELECT 
    r.customer_id,
    r.car_id,
    r.id as rentalId, 
    cus.name as customerName, 
    crs.name as carName,
    r.kilometers, 
    r.active
    FROM rental r 
    INNER JOIN customers cus ON cus.id=r.customer_id 
    INNER JOIN cars crs ON crs.id=r.car_id 
    LIMIT ${offset},${config.listPerPage}`
  );
  const data = emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

export async function create(rental) {
  const result1 = await query(
    `INSERT INTO rental (customer_id, car_id, kilometers) 
    VALUES ("${rental.customerId}", "${rental.carId}", "${rental.kilometers}")`
  );

  const result2 = await query(
    `UPDATE cars SET available="0" WHERE id="${rental.carId}"`
  );

  let message = 'Error in creating rental';

  if (result1.affectedRows && result2.affectedRows) {
    message = 'rental created successfully';
  }

  return { message };
}

export async function update(id, rental) {
  const result = await query(
    `UPDATE rental SET customer_id="${rental.customer_id}", car_id="${rental.car_id}", kilometers="${rental.kilometers}", active="${rental.active ? 1 : 0}" WHERE id=${id}`
  );

  if (!rental.active) {
    const car = await query(`SELECT * FROM cars WHERE id="${rental.car_id}"`);
    query(`UPDATE cars SET kilometers="${car[0].kilometers + rental.kilometers}", available="${1}" WHERE id=${car[0].id}`);
  }

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
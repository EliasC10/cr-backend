import { query } from './db.js';
import { getOffset, emptyOrRows } from '../helper.js';
import { config } from '../config.js';

export async function getMultiple(page = 1) {
  const offset = getOffset(page, config.listPerPage);
  const rows = await query(
    `SELECT id, name FROM customers LIMIT ${offset},${config.listPerPage}`
  );
  const data = emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

export async function create(customer) {
  const result = await query(
    `INSERT INTO customers (name) VALUES ("${customer.name}")`
  );

  let message = 'Error in creating customer';

  if (result.affectedRows) {
    message = 'customer created successfully';
  }

  return { message };
}

export async function update(id, customer) {
  const result = await query(
    `UPDATE customers SET name="${customer.name}" WHERE id=${id}`
  );

  let message = 'Error in updating customer';

  if (result.affectedRows) {
    message = 'customer updated successfully';
  }

  return { message };
}

export async function remove(id) {
  const result = await query(
    `DELETE FROM customers WHERE id=${id}`
  );

  let message = 'Error in deleting customer';

  if (result.affectedRows) {
    message = 'customer deleted successfully';
  }

  return { message };
}
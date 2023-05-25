const fs = require('fs');

function csvToSqlQueries(csvFilePath, tableName) {
  const csvData = fs.readFileSync(csvFilePath, 'utf-8');
  const rows = csvData.split('\n');

  const columnNames = rows.shift().split(',');

  const queries = rows.map(row => {
    const values = row.split(',');
    const formattedValues = values.map(value => `'${value}'`).join(',');
    return `INSERT INTO ${tableName} (${columnNames.join(',')}) VALUES (${formattedValues});`;
  });

  return queries;
}

// Example usage
const csvFilePath = 'data.csv';
const tableName = 'myTable';
const queries = csvToSqlQueries(csvFilePath, tableName);
console.log(queries.join('\n'));

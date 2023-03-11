// const { exec } = require('child_process');
const { Sequelize } = require('sequelize');
// const fs = require('fs');
const sequelize = require("../utils/database");
// const { backup } = require('sequelize-mysql-backup');

// module.exports = {
//     getDataDump: (async (req, res) => {
//       backup({
//         sequelize,
//         storage: fs.createWriteStream('mydatabase_dump.sql')
//       }).then(() => {
//         console.log('Database dump saved successfully');
//       }).catch(error => {
//         console.error(`Error dumping database: ${error.message}`);
//       });
//       // sequelize.backup({ file: 'mydatabase_dump.sql' }).then(() => {
//       //   console.log('Database dump saved successfully');
//       // }).catch(error => {
//       //   console.error(`Error dumping database: ${error.message}`);
//       // });
      
//     // const tables = await sequelize.showAllSchemas();
//     // const tableNames = tables.map(table => table.name);
//     // const dumpFileName = 'mydatabase_dump.sql';
//     // const command = `C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump -u root -p 1234 InventoryManagement ${tableNames.join(' ')} > ${dumpFileName}`;
//     // exec(command, (error, stdout, stderr) => {
//     //   if (error) {
//     //     console.error(`Error dumping database: ${error.message}`);
//     //     return;
//     //   }
//     //   if (stderr) {
//     //     console.error(`stderr: ${stderr}`);
//     //     return;
//     //   }
//     //   console.log(`Database dump saved to ${dumpFileName}`);
//     // });
//     res.sendStatus(200);
//   })
// }

const { createConnection } = require('mysql');
const { backup } = require('node-mysql-backup');
const fs = require('fs');

// Define the database connection details
const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'InventoryManagement'
});

// Use node-mysql-backup to create a backup of the database
module.exports = {
      getDataDump: (async (req, res) => {
        sequelize.query('SHOW TABLES', { type: Sequelize.QueryTypes.SHOWTABLES })
  .then((results) => {
    const tableNames = [];
    results.forEach(row => {
      console.log(row);
      tableNames.push(row);
    });
    console.log(tableNames);
          // // Use sequelize to fetch all data from each table and write it to a file
          const dumpFileName = 'mydatabase_dump.sql';
          const stream = fs.createWriteStream(dumpFileName);
          tableNames.forEach((tableName, i) => {
            sequelize.query(`SELECT * FROM ${tableName}`, { type: Sequelize.QueryTypes.SELECT })
              .then(rows => {
                // Write the table data to the file in SQL format
                stream.write(`-- Table: ${tableName}\n`);
                stream.write(`INSERT INTO ${tableName} VALUES\n`);
                rows.forEach(row => {
                  const values = Object.values(row).map(value => `'${value}'`).join(',');
                  stream.write(`(${values}),\n`);
                });
                stream.write(';\n');
                if (i === tableNames.length - 1) {
                  stream.end();
                  console.log('Database dump saved successfully');
                  res.sendStatus(200);
                }
              })
              .catch(error => {
                res.sendStatus(500);
                console.error(`Error dumping table ${tableName}: ${error.message}`);
              });
          });
        })
        .catch(error => {
          res.sendStatus(500);
          console.error(`Error getting table names: ${error.message}`);
        });
    })
  }

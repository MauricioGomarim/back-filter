require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};


// module.exports = {
//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './src/database/database.db'
//     },
//     useNullAsDefault: true,
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: './migrations' // ajuste se suas migrations estiverem em outro lugar
//     }
//   }
// };

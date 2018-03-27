const mysql = require('mysql')
const dbconfig = require('./development')
const pool = mysql.createPool({
  host: dbconfig.database.HOST,
  user: dbconfig.database.USERNAME,
  password: dbconfig.database.PASSWORD,
  database: dbconfig.database.DATABASE_ACCOUNT
})

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }
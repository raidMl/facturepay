import mysql from 'mysql2'

export const pool=mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'facture_db'
}).promise()

pool.query('SELECT * FROM facture').then((result=>console.log(result[0])))
.catch((err)=>console.log(err))

export default pool;
 

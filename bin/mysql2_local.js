/*
 * @Author: huoshao
 * @Date: 2020-04-14 21:03:29
 * @LastEditors: Yang Kun
 * @LastEditTime: 2020-09-28 15:55:36
 * @Description: file content
 */
var mysql = require('mysql2');

const pool = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'themesite',
    charset: 'utf8mb4'
});
// const pool = mysql.createConnection({
//     host: '132.232.206.184',
//     user: 'jsnnid',
//     password: 'm@J2&df_1',
//     database: 'wordpress',
//     charset: 'utf8'
// });

pool.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    // console.log('connected as id ' + pool.threadId);
});

process.on('exit', async (code) => {
    try {
        // console.log('mysql exit');
        await pool.end()
    } catch (e) {
        // console.error('mysql error exit');
    }
    process.exit(0);
})

const promisePool = pool.promise();

pool.promisePool = promisePool;
module.exports = pool;

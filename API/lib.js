/**
 * Function connects to a MySQL database.
 * 
 * @param {string} host MySQL host.
 * @param {string} user MySQL user.
 * @param {string} pass MySQL password for user.
 * @param {string} database MySQL database to connect to.
 * @param {object} mysql Object declared in index.js.
 * @returns Connection to mysql database.
 */
function con_db(host, user, pass, database, mysql) {
    var con = mysql.createConnection({
        host: host,
        user: user,
        password: pass,
        database: database
    });
    
    con.connect(function(err) {
        if (err) throw err;
        console.log('Connected to database: ' + database);
    });

    return con;
}

module.exports = {
    con_db
};
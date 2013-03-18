function DAO() {

    this.database_name = 'testing_database';
    this.database_version = '1.0';
    this.database_displayname = 'Testing Database';
    this.database_size = 1 * 1000 * 1000;

    this.database;
    this.databaseIsOpen = false;

    // Open of return the database object
    this.getDB = function() {
        if (!this.databaseIsOpen) {
            this.database = window.openDatabase(
                    this.database_name, this.database_version,
                    this.database_displayname, this.database_size);
        }
        return this.database;
    };

    this.error = function(err) {
        alert("Error processing SQL: " + err.code);
    };

    this.success = function() {
        alert("Success SQL!");
    };

    // Database installation / creation
    this.install = function() {
        this.getDB().transaction(installScript, this.error, this.success);
    };
    function installScript(tx) {
        tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

    // Query
    this.query = function(tx) {
        tx.executeSql('SELECT * FROM DEMO', [], querySuccess, error);
    };
    function querySuccess(tx, results) {
        alert("Returned rows = " + results.rows.length);
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            alert('No rows affected!');
            return false;
        }
        // for an insert statement, this property will return the ID of the last inserted row
        alert("Last inserted row ID = " + results.insertId);
    }

}
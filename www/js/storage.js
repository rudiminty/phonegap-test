function DAO() {

    this.database_name = 'testing_database';
    this.database_version = '1.0';
    this.database_displayname = 'Testing Database';
    this.database_size = 1 * 1000 * 1000;

    this.database;
    this.databaseIsOpen = false;

    // Open of return the database object
    this.getDB = function() {
        this.database = window.openDatabase(
                this.database_name, this.database_version,
                this.database_displayname, this.database_size);
        return this.database;
    };

    // Standard Success / Error Handling
    this.error = function(err) {
        alert("Error processing SQL: " + err.code);
    };
    this.success = function() {
        alert("Success SQL!");
    };

    // Install
    this.install = function() {
        this.getDB().transaction(installScript, this.error, this.success);
    };
    function installScript(tx) {
        // tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "Inserted Value")');
        // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

    // Query
    this.update = function() {
        this.getDB().transaction(updateScript, this.error);
    };
    function updateScript(tx) {
        tx.executeSql('UPDATE DEMO SET data = \'' + $('save-value').value + '\' WHERE id = 1', [],
            function() {
                alert('Update successfull: ' + $('save-value').value);
            },
            function(err) {
                alert("Update failed - SQL: " + err.code);
            }
        );
    }

    // Query
    this.query = function() {
        this.getDB().transaction(queryScript, this.error);
    };
    function queryScript(tx) {
        tx.executeSql('SELECT * FROM DEMO', [], function(tx, results) {
            var data = "default";
            var len = results.rows.length;
            alert("DEMO table: " + len + " rows found.");
            for (var i=0; i<len; i++) {
                alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
                data = results.rows.item(i).data;
            }
            $('save-value').value = data;
        }, this.error);
    };

//    function querySuccess(tx, results) {

        // this will be true since it was a select statement and so rowsAffected was 0
//        if (!results.rowsAffected) {
//            alert('No rows affected!');
//            return false;
//        }
        // for an insert statement, this property will return the ID of the last inserted row
//        alert("Last inserted row ID = " + results.insertId);
//    }

}
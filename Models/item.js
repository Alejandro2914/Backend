const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db'); // Conectar a la base de datos

// Crear la tabla si no existe (agregamos el campo 'price')
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL)");
});

// Funciones CRUD

// Crear un nuevo item
function createItem(name, description, price, callback) {
    const stmt = db.prepare("INSERT INTO items (name, description, price) VALUES (?, ?, ?)");
    stmt.run(name, description, price, function(err) {
        callback(err, this.lastID);
    });
    stmt.finalize();
}

// Obtener todos los items
function getAllItems(callback) {
    db.all("SELECT * FROM items", (err, rows) => {
        callback(err, rows);
    });
}

// Obtener un item por ID
function getItemById(id, callback) {
    db.get("SELECT * FROM items WHERE id = ?", [id], (err, row) => {
        callback(err, row);
    });
}

// Actualizar un item
function updateItem(id, name, description, price, callback) {
    const stmt = db.prepare("UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?");
    stmt.run(name, description, price, id, function(err) {
        callback(err, this.changes);
    });
    stmt.finalize();
}

// Eliminar un item
function deleteItem(id, callback) {
    const stmt = db.prepare("DELETE FROM items WHERE id = ?");
    stmt.run(id, function(err) {
        callback(err, this.changes);
    });
    stmt.finalize();
}

module.exports = {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
};

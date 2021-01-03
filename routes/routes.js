// Load the MySQL pool connection
const pool = require('../data/config');

// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({
            message: 'Welcome to the Node.js Express REST API!'
        });
    });

     // Display all users
    app.get('/finishers', (request, response) => {
        pool.query('select * from finishers', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.get('/finishers/stem_number/:stem', (request, response) => {
        const stem = request.params.stem;
        pool.query('SELECT * FROM finishers WHERE stem_number = ?', stem, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Display all users
    app.get('/finishers/stem_id/:id', (request, response) => {
        const id = request.params.id;
        pool.query('SELECT * FROM stem_id WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });
    

    // Add a new user
    app.post('/finishers', (request, response) => {
        pool.query('INSERT INTO finishers SET ?', request.body, (error, result) => {
            if (error) throw error;
            response.status(201).send(`Finishers added with ID: ${result.insertId}`);
        });
    });

    

}

// Export the router
module.exports = router;
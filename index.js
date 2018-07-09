const mongoose = require('mongoose');

const app = require('./src/app');

mongoose.connect('mongodb://localhost/todos1');

mongoose.connection.on('connected', () => console.log('mongoose connected'));

const PORT = 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

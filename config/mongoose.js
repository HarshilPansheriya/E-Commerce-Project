const mongoose = require('mongoose');
const URL = "mongodb://127.0.0.1/E_COMMERCE";

mongoose.connect(URL);

mongoose.connection.on('connected', () => console.log("Db is connected"));
mongoose.connection.on('err', (err) => console.log("Db is not connected", err));
mongoose.connection.on('dissconnected', () => console.log("Db is dissconnected"));
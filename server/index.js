const express = require('express');
const app = express();
const PORT = 5001;
require("./DB/connection");
const cors = require('cors');
const router = require('./routes/router');

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("./uploads"));

app.use(router);
app.get("/", (req, res) => (
    res.send('Server Start at port - ' + PORT)
))



app.listen(PORT, () => (
    console.log('Server start - ' + PORT)
))
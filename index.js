const express = require('express');
const app = express();
const PORT = 8000;

const saveRoute = require('./src/routes/save.route');

app.use(express.json());
app.use(saveRoute);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

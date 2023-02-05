const express = require('express');
const app = express();
const PORT = 8000;

const saveRoute = require('./src/routes/save.route');
const rankingRoute = require('./src/routes/ranking.route');
const updateDetailsRoute = require('./src/routes/updateDetails.route');
app.use(express.json());

app.use(saveRoute);
app.use(rankingRoute);
app.use(updateDetailsRoute);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

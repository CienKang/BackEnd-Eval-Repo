const express = require('express');
const PORT = 8000;
const app = express();
const POST_COMPANY_SECTOR_API = require('./src/routes/save.route');

app.use(express.json());
app.use(POST_COMPANY_SECTOR_API);

app.listen(PORT,()=>{
    console.log(`Server running on port:${PORT}`);
});

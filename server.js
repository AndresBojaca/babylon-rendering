const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;
app.options('*', cors())
app.listen(port, () => {
     console.log(`Server is up on port ${port}`);
});
app.use(express.static('public'));

export default app;
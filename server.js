// const express = require('express');
import express from 'express';
import cors from 'cors';
const app = express();
// var cors = require('cors')

const port = process.env.PORT || 3000;
app.options('*', cors())
app.listen(port, () => {
     console.log(`Server is up on port ${port}`);
});
app.use(express.static('public'));

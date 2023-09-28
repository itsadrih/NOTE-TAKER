const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const notesRoutes = require('./routes/notesRoutes'); 
const app = express();
const PORT = process.env.PORT || 3003;
const jsonServer = require('json-server');


const cors = require('cors'); 
const router = jsonServer.router('db.json');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));


app.use('/api', apiRoutes); 
app.use('/notes', notesRoutes); 
app.use('/', htmlRoutes); 


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
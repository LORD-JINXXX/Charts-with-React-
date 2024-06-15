require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require('path');

const app = express();


const corsConfig = {
    credentials: true,
    origin: true,
};


//middlewares
app.use(express.static('./public'));


app.use(express.json());
app.use(cors(corsConfig));

//database
const username = encodeURIComponent(process.env.USER_NAME);
const password = encodeURIComponent(process.env.PASSWORD);
const cluster = process.env.CLUSTER_NAME;
const db_name = process.env.DATABASE_NAME;
const mongoose = require("mongoose");

const  url = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const connectDB = async()=>{
    try {
        await mongoose.connect(url, {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }    
};

connectDB();

/* const dataJson = require('./jsondata.json');
const Data = require('./models/data');

const importData = async () => {
    try {
        const dataFilePath = path.join(__dirname, 'jsondata.json');
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
        await Data.Data.insertMany(data);
        console.log('Data imported successfully');
    } catch (err) {
        console.error('Error importing data:', err);
    }
};

app.get('/api/import', async (req, res) => {
    await importData();
    res.send('Data imported successfully');
}); */

const Data = require('./models/data');

app.get('/api/fetch', async(req, res)=> {
    try {
        const data = await Data.Data.find({});
        res.json({data});
    } catch (error) {
        console.error('COULD NOT FETCH THE DATA:', error.message);
    }
})


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on ${port}`)
});


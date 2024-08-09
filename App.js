const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/contactDance', {
    
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const bodyParser = require("body-parser")
const port = 8081;


var contactSchema= new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
});

var contact = mongoose.model('contact',contactSchema);
// Express specific stuff
app.use('/static', express.static('static'))  // for serving static files
app.use(express.urlencoded({ extended: false }))

// Pug specific stuff
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

// End Point
app.get('/', (req, res) => {
    const con = "This is the best content"
    const params = { 'title': 'Pubg is the best game', "content": con }
    res.status(200).render('home.pug', req.body);
})

// Render the contact form (GET request)
app.get("/contact", (req, res) => {
    const params = { }
    res.status(200).render('contact.pug');
});

// Handle form submission (POST request)
app.post('/contact', (req, res) => {
    const { name, phone, email, address, desc } = req.body;
    console.log(req.body)
    if (!name || !phone || !email || !address || !desc) {
        return res.status(400).send("All fields are required.");
    }

    const myData = new contact({ name, phone, email, address, desc });
    myData.save()
        .then(() => {
            res.send("Data saved successfully!");
        })
        .catch((error) => {
            console.error("Error saving data:", error);
            res.status(500).send("Error saving data");
        });
});



app.listen(port, () => {
    console.log(`The application successfully started on port ${port}`);
});

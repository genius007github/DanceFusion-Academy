const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

const app = express();
const port = 8081;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/contactDance', {})
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use('/static', express.static('static')); // Serving static files
app.use(express.urlencoded({ extended: false })); // Parsing URL-encoded data

// Pug Specific Configuration
app.set('view engine', 'pug'); // Set Pug as the template engine
app.set('views', path.join(__dirname, 'views')); // Set views directory


// Endpoints
app.get('/', (req, res) => {
    const con = "This is the best content";
    const params = { 'title': 'Pubg is the best game', "content": con };
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.get('/about', (req, res) => {
    // console.log("Accessing About page"); // Debugging log
    res.status(200).render('about.pug');
});
app.get('/service', (req, res) => {
    res.status(200).render('service.pug');
});

app.get('/classInfo', (req, res) => {
    res.status(200).render('classInfo.pug');
});


// Handle form submission (POST request)
app.post('/contact', (req, res) => {
    const { name, phone, email, address, desc } = req.body;

    // Check for missing fields
    if (!name || !phone || !email || !address || !desc) {
        return res.status(400).send("All fields are required.");
    }

    // Create and save contact data
    const myData = new Contact({ name, phone, email, address, desc });
    myData.save()
        .then(() => {
            res.send("Data saved successfully!");
        })
        .catch((error) => {
            console.error("Error saving data:", error);
            res.status(500).send("Error saving data");
        });
});

// Handle 404 - Page Not Found
app.use((req, res) => {
    res.status(404).send("404: Page not found");
});

// Start the server
app.listen(port, () => {
    console.log(`The application successfully started on port ${port}`);
});

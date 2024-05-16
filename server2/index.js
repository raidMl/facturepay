import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import pool from './database.js';

import FactureRoute from './routes/facuture.routes.js';
import AuthRoute from './routes/auth.routes.js';
import PayRoute from './routes/payment.routes.js';
import session from 'express-session';
dotenv.config();
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true, }));

app.use(express.json());

app.use(express.static('public'));


// Configure session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use('/api/facture', FactureRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/pay', PayRoute,);


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/main', (req, res) => {
    res.render('main');
  });
app.get('/loginRegister', (req, res) => {
    res.render('loginRegister');
});

app.get('/userProfile', (req, res) => {
    res.render('userProfile', { user: req.session.user });
});

app.get('/history', (req, res) => {
    res.render('history', { user: req.session.user });
});

// Render facture page with invoices data
app.get('/facture', async (req, res) => {
    try {
        const userId = req.session.user.id; // Retrieve user ID from session (assuming user is authenticated)

        // Fetch pending invoices for the specified user from the database
        const [rows] = await pool.query(
            'SELECT * FROM facture WHERE status = ? AND id_user = ?',
            ['pending', userId]
        );

        // Render 'facture.ejs' template with 'invoices' data
        res.render('facture', { user: req.session.user, invoices: rows });
    } catch (error) {
        console.error('Error fetching pending invoices:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Render pay page
app.get('/pay', async(req, res) => {
    try {
        const userId = req.session.user.id; // Retrieve user ID from session (assuming user is authenticated)

        // Fetch pending invoices for the specified user from the database
        const [rows] = await pool.query(
            'SELECT id,name,montant FROM facture WHERE status = ? AND id_user = ?',
            ['pending', userId]
        );

        // Render 'facture.ejs' template with 'invoices' data
        res.render('pay', { user: req.session.user, invoices: rows });
    } catch (error) {
        console.error('Error fetching pending invoices:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

    // res.render('pay');
});




app.listen(8080,()=>(console.log('server is running in port 8080')));


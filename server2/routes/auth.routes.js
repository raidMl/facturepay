import pool from "../database.js";
import express from 'express';

const router=express.Router();



router.post('/login', async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM user WHERE user.email=? and user.password=?`, [req.body.email, req.body.password]);
        
        if (rows.length === 0) {
            return res.status(400).json({ message: "No user found" });
        }
        
        if (rows[0].role === 'client' && rows.length === 1) {
            // Set session user data
            req.session.user = rows[0];
            console.log('Session user:', req.session.user);

             // Render userProfile.ejs template with user data
            //  res.render('userProfile', { user: req.session.user });

             // Redirect to main route after rendering userProfile.ejs
             return res.redirect('/main');
        } else {
            // Redirect to loginRegister if user role or length condition not met
            return res.redirect('/loginRegister');
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.post('/login-admin',async(req,res)=>{
    try {
        const [rows]=await pool.query(`SELECT * FROM user WHERE user.email=? and user.password=? and role=?` ,[req.body.email,req.body.password,"admin"]);
        if(rows.length===0){
            return res.status(400).json({message:"No user  found"});
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
    
})


router.post('/register',async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        await pool.query(`INSERT INTO user(nom,prenom,adresse,telephone,email,password) VALUES(?,?,?,?,?,?)`,[req.body.nom,req.body.prenom,req.body.adresse,req.body.telephone,email,password]);
        // res.status(201).json({message:"User created"});
        res.redirect('/loginRegister');
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
})

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});





export default router;
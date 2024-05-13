import pool from "./../database.js";
import express from 'express';

const router=express.Router();

router.post('/payment',async(req,res)=>{
    try {
        const {numero,solde,cvv,date_expiration,id_user}=req.body;
        if(req.body){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        await pool.query(`insert into  compte(numero,solde,cvv,date_expiration,id_user) VALUES(?,?,?,?,?)`,[numero,solde,cvv,date_expiration,id_user]);
        res.status(201).json({message:"Payment created"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
        
})

router.patch('/payment',async(req,res)=>{
    try {
        const {numero,solde,cvv,date_expiration,montant,id_user}=req.body;
        if(!id_user || !montant){
            return res.status(400).json({message:"Please fill all the fields"});

        }
        row=await pool.query(`select * from compte where numero=? and cvv=? and date_expiration=? and id_user=?`,[numero,cvv,date_expiration,id_user]);
       if(row.length===0){
           return res.status(400).json({message:"No compte found"});}

        await pool.query(`update compte set solde=solde-? where id_user=?`,[montant,id_user]);
        res.status(201).json({message:"Payment created"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
})

export default router;
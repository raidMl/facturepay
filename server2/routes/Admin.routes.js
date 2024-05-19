import pool from "../database.js";
import express from 'express';

const router=express.Router();


router.get('/getusers', async (req, res) => {
    if (req.session.user.role==='admin')
        try {
        const [rows] = await pool.query(`SELECT * FROM user WHERE role=?`,['client']);
        res.json(rows);
    } catch (error) {
        console.error('Admin error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.delete('removeUser/:id',async(req,res)=>{
    if (req.session.user.role=='admin')
    try {
        const row=await pool.query(`DELETE FROM user WHERE id=?`,[req.params.id]);
        if(row.affectedRows===0){
            return res.status(400).json({message:"No user found"});
        }
        res.status(200).json({message:"User deleted"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
})

router.get('/getfactures', async (req, res) => {
    if (req.session.user.role==='admin')
        try {
          const [rows] = await pool.query(`SELECT * FROM facture `);
          res.json(rows);
      } catch (error) {
          console.error('facture error:', error);
          return res.status(500).json({ message: "Internal server error" });
      }
  })

  router.delete('removeFacture/:id',async(req,res)=>{
    if (req.session.user.role=='admin')
    try {
        const row=await pool.query(`DELETE FROM facture WHERE id=?`,[req.params.id]);
        if(row.affectedRows===0){
            return res.status(400).json({message:"No facture found"});
        }
        res.status(200).json({message:"Facture deleted"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
})


export default router;
import express from 'express';
import  pool  from '../database.js';

const router=express.Router();

//for see history all payed factures
router.get('/payed', async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM facture WHERE status=? AND id_user=?`, ["Paid", req.session.user.id]);
        if (rows.length === 0) {
            return res.status(400).json({ message: "No paid factures found" });
        }
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.delete('/payed/:id',async(req,res)=>{
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
//for search
router.get('/:id',async(req,res)=>{
  try {
        
    const [rows]=await pool.query(`SELECT * FROM facture WHERE id=?`,[req.params.id]);
    if(rows.length===0){
        return res.status(400).json({message:"No facture found"});
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({message:error.message});
    
  }})


// for search in pending factures
router.get('/pending/:id',async(req,res)=>{
    try {
          
      const [rows]=await pool.query(`SELECT * FROM facture WHERE id=?`,[req.params.id]);
      if(rows.length===0){
          return res.status(400).json({message:"No facture found"});
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      res.status(500).json({message:error.message});
      
    }})

    //get all pendign

    router.get('/pending',async(req,res)=>{
        try {
              
            const userId = req.session.user.id; // Retrieve user ID from session (assuming user is authenticated)

            // Fetch pending invoices for the specified user from the database
            const [rows] = await pool.query(
                'SELECT id,name,montant FROM facture WHERE status = ? AND id_user = ?',
                ['pending', userId]
            );
            
            if(rows.length===0){
              return res.status(400).json({message:"No facture found"});
          }
          const rows1=JSON.stringify(rows)
          res.status(200).json({data:rows1});
        } catch (error) {
          res.status(500).json({message:error.message});
          
        }})


router.post('/admin',async(req,res)=>{
    try {
        const {id_user}=req.body;
        if(!id_user ){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        await pool.query(`INSERT INTO facture(name,date,montant,status,id_user) VALUES(?,?,?,?,?)`,[req.body.name,req.body.date,req.body.montant,req.body.status,id_user,]);
        res.status(201).json({message:"Facture created"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
})


export default router;
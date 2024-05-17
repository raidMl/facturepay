import pool from "./../database.js";
import express from 'express';

const router=express.Router();

router.get('/payment',async(req,res)=>{
    try {
        const id=req.session.user.id;
      

        const userInfo=await pool.query(`select * from  compte where id_user=?`,[id]);
        
        res.status(201).json({userInfo:userInfo});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
        
})


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




router.patch('/payment', async (req, res) => {
    try {
        const { numero, cvv, date_expiration, montant, id_user, fname, factureType, factureNumber } = req.body;
        if (!id_user || !montant) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const [row] = await pool.query(`SELECT * FROM compte WHERE numero=? AND cvv=? AND date_expiration=? AND id_user=? AND nom=?`, [numero, cvv, date_expiration, id_user, fname]);
        if (!row) {
            return res.status(400).json({ message: "No compte found" });
        }

        await pool.query(`UPDATE compte SET solde=solde-? WHERE id_user=?`, [montant, id_user]);
        await pool.query(`UPDATE facture SET status='paid' WHERE id_user=? AND name=? AND facture.id=?`, [id_user, factureType, factureNumber]);

        res.status(201).json({ message: "Payment created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;
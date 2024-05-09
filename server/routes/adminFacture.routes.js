// create and //delete ,//read(detailspayed or not  ) facuture for spasific user
//see my money acount in profile 



import Facture from "../models/facture.js";
import Ccp from "../models/ccp.js";
import express from "express"

const router = express.Router();

router.post('/',async(req,res)=>{

    try{
const facture=await Facture.create(req.body)
res.status(200).json(facture)
    }
    
    catch(err){
        res.status(500).json("error in creating facture")
    }



})

router.delete('/',async(req,res)=>{
    try {
        const {id}=req.params
        const deletedFacture =await Facture.findByIdAndDelete(id)
        
        if(!deletedFacture)
            res.status(404).json("can not find facture with this id")
  
       const factures= await Facture.find()
       res.status(200).json(factures)
    } catch (error) {
        res.status(500).json('intrnal server error')
    }
})





router.get('/',async(req,res)=>{
    try {

        const factures=await Facture.find()
        res.status(200).json(factures)
        
    } catch (error) {
        res.status(500).json({message:error})
        
    }
})


router.get('/',async(req,res)=>{
    try {

        const {id}=req.params
        const ccpInfo=await Ccp.findById(id)
        res.status(200).json(ccpInfo)
        
    } catch (error) {
        res.status(500).json({message:error})
        
    }
})

export default router;
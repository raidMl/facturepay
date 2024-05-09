import { genSalt, hash as _hash } from "bcrypt";
import Joi from "joi";
import { Router } from "express";
import User  from "../models/user.js";
// import { toFile } from "qrcode";


const router = Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({                // for request body validation
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(8).max(50).required().email(),
    password: Joi.string().min(8).max(200).required(),
    phone: Joi.string().min(8).max(15).required(),
    adress: Joi.string().min(4).max(30).required(),

    role: Joi.string().min(4).max(10),
    // matricule: string().min(3).max(10),
    // isActive: Joi.bool()
  })

  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //check email exsist or no
  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send("user already exist..")


  //register

  user = new User({
    name: req.body.name,
    adress:req.body.adress,
    email: req.body.email,
    password: req.body.password,
    phone:req.body.phone,
     role: req.body.role,
    // isActive: false,


  })
  //hash pass
  const salt = await genSalt(10) //generate string of 10 char
  user.password = await _hash(user.password, salt)
  user = await user.save()

  const payload=
  {
      _id:user._id,
      email:user.email,
      name:user.name,
  }
  const token = jwt.sign(payload,process.env.secret_key, {
      expiresIn: 86400 // 24 hours
  });
  res.status(200).send({ token: token });
})

export default router
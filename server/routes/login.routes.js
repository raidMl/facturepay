import express from 'express';
const router = express.Router();
import User from '../models/user.js';

// POST /login
router.post('/login', async(req, res) => {

await User.findOne({ email: req.body.email }, (err, user) => {  
    if (err) {
        console.log(err);
        return res.status(500).send({ message: 'An error occurred while logging in.' });
    }
    if (!user) {
        return res.status(404).send({ message: 'invalid user or password.' });
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({ token: null, message: 'Invalid password!' });
    }
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
}
);

});

export default router;
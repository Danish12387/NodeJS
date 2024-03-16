import express from 'express';
import Users from '../models/Users.mjs';
import verifyToken from '../middlewares/verifyToken.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await Users.find();
        res.send({ message: 'Users fetched successfully!', Users: users });
    }
    catch (e) {
        res.send({ message: e.message })
    }
})

router.post('/register', async (req, res) => {
    try {
        const user = new Users(req.body);
        await user.save()

        res.send({ message: 'User registered successfully!' })
    }
    catch (e) {
        res.send({ message: e.message })
    }
})

router.put('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user) {
            res.send({ message: 'User Not Found!' })
            return;
        }

        const isCorrectPass = user.comparePassword(password);
        
        if (!isCorrectPass) {
            res.send({ message: 'Invalid Password!' })
            return
        }

        // Generate Token:
        const token = user.generateToken();
        user.tokens.push(token);
        await user.save();

        res.send({ message: "User logged in successfully!", token: token });
    }
    catch (e) {
        res.send({ message: e.message });
    }
})

router.put('/logout', verifyToken,async (req, res) => {
    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove }});
    res.send({ message: 'Logged Out Successfully!'})
})

export default router;
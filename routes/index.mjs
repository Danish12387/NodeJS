import express from 'express';
import products from './products.mjs';


const router = express.Router();


router.use('/products', products);

router.use('/', (req, res) => {
    res.send({message: "This is localhost 3001"});
})

export default router;
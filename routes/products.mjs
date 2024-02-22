import express from 'express';

const router = express.Router();

const products = [{ "id": 1, "title": "iPhone 9", "description": "An apple mobile which is nothing like apple", "price": 549, "discountPercentage": 12.96, "rating": 4.69, "stock": 94, "brand": "Apple", "category": "smartphones", "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg", "images": ["https://cdn.dummyjson.com/product-images/1/1.jpg", "https://cdn.dummyjson.com/product-images/1/2.jpg", "https://cdn.dummyjson.com/product-images/1/3.jpg", "https://cdn.dummyjson.com/product-images/1/4.jpg", "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"] }, { "id": 2, "title": "iPhone X", "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...", "price": 899, "discountPercentage": 17.94, "rating": 4.44, "stock": 34, "brand": "Apple", "category": "smartphones", "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg", "images": ["https://cdn.dummyjson.com/product-images/2/1.jpg", "https://cdn.dummyjson.com/product-images/2/2.jpg", "https://cdn.dummyjson.com/product-images/2/3.jpg", "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"] }]

router.get('/', (req, res) => {
    res.send({ message: 'Products fetched successfully!', products })
})

// products.map((item)=>{
//     router.get(`/${item.id}`, (req, res) => {
//         res.send(item)
//     })
// })

products.map((item) => {
    router.get('/:id', (req, res) => {
        if (req.params.id == item.id) {
            res.send({ message: 'Single product fetched successfully', data: item })
        } else {
            res.send({ message: `Cannot find data of this '${req.params.id}' id!` });
        }
    })
})

router.post('/add', (req, res) => {
    console.log(req.body)
    res.send({ message: "Product added successfully!" })
})

router.put('/update', (req, res) => {
    console.log(req.body)
    res.send({ message: "Product updated successfully!" })
})

products.map((item) => {
    router.delete('/:id', (req, res) => {
        if (req.params.id == item.id) {
            res.send({ message: 'Product deleted successfully', deletedProduct: item })
        } else {
            res.send({ message: `Cannot find data of this '${req.params.id}' id!` });
        }
    })
})

export default router;
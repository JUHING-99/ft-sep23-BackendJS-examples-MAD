const fetch = require('node-fetch');

const router = require('express').Router()

router.get("/:id?", async (req, res) => {

    if (req.params.id) { // con ID
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); //{}
            let products = await response.json(); //{}
            res.status(200).json(products); // Respuesta de la API para 1 producto
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj:`ERROR: ${error.stack}`});
        }
    } else { // sin ID --> TODOS los products
        try {
            let response = await fetch(`https://fakestoreapi.com/products`); // []
            let products = await response.json(); // []
            res.status(200).json(products); // Respuesta de la API para muchos productos
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj:`ERROR: ${error.stack}`});
        }
    }

});

/*
POST /products

A enviar por Body:
{
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "price": 695,
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
    "rate": 4.6,
    "count": 400
    }
}
*/

router.post("/", (req, res) => {
    console.log(req.body);
    res.status(201).json({
        success:true,
        title:req.body.title,
        id: Math.floor(Math.random() * (10000 - 1) + 1),
        data:req.body
    });
});

router.put("/", (req, res) => {
    res.status(200).send("Producto editado!");
});
router.delete("/:id?", (req, res) => {
    res.status(200).send("Producto borrado!. Has borrado:"+req.params.id);
});

module.exports = router;
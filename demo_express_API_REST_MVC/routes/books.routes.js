const router = require('express').Router()
const booksController = require('../controllers/books.controller');

// CRUD --> CREATE, READ, UPDATE, DELETE

// Query params:
// http://localhost:3000/books/quijote
// http://localhost:3000/books/
// http://localhost:3000/books/celestina
/* router.get("/books/:title?", (req, res) => {
    if(req.params.title){
        console.log(req.params.title);
        res.status(200).send("Has pedido: "+req.params.title);
    }
    else{
        res.status(200).send("Has pedido todos los libros");
    }

}); */

// Query params:
// http://localhost:3000/books/quijote
// http://localhost:3000/books/
// http://localhost:3000/books/celestina

//router.get("/:title?",getBooks);
router.get("/:title?", booksController.getBook);

/*
{
  "title": "Don Quijote de la Mancha",
  "author":"Miguel de Cervantes",
  "pages": 2000,
  "year":1550,
  "description": "en un lugar de la mancha..."
}
*/
router.post("/", booksController.createBook);

router.put("/", booksController.editBook);

router.delete("/:title?", booksController.deleteBook);

module.exports = router;
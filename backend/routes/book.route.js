import { Router } from "express";
import { addBook, fetchBooks, searchBooks, fetchBook, deleteBook, updateBook } from "../controllers/book.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/auth/add-book",protectRoute,addBook)
router.get("/auth/fetch-books",fetchBooks)
router.get("/auth/search-books",searchBooks)
router.get("/auth/fetch-book/:id",fetchBook)
router.delete("/auth/delete-book/:id",protectRoute,deleteBook)
router.put("/auth/update-book/:id",protectRoute,updateBook);

export default router;
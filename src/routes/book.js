import express from "express";
import { create, destroy, find, index, update } from "../controllers/book.controller.js";

const router = express.Router()

router.get('/', index);
router.get('/:code', find);
router.post('/', create)
router.put('/:code', update)
router.delete('/:code', destroy)



export { router as routerBook };
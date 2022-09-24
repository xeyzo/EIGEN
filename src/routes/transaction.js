import express from "express";
import { pinjamBuku, index, pengembalianBuku } from "../controllers/transaction.controller.js";

const router = express.Router();

router.get('/', index);
router.post('/pinjam-buku', pinjamBuku);
router.delete('/:id/:code_buku', pengembalianBuku)

export { router as routerTransaction };
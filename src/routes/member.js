import express from "express";
import { create, destroy, find, index, update, sendPenalty } from "../controllers/member.controller.js";

const router = express.Router()

router.get('/', index);
router.get('/:code', find);
router.post('/', create);
router.put('/:code', update);
router.put('/send-penalty/:code', sendPenalty)
router.delete('/:code', destroy);



export { router as routerMember };
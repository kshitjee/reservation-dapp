import express from "express";
const router = express.Router()
import {
  createAuction,
  getAuctions,
  getAuctionById,
} from "../controllers/auctionControllers.js";

router.post('/createauction', createAuction);
router.get('/', getAuctions);
router.get('/:id', getAuctionById);

export default router; 
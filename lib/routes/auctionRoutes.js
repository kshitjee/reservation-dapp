import express from "express";
const router = express.Router()
import {
  createAuction,
  getAuctions,
  getAuctionById,
  processBid
} from "../controllers/auctionControllers.js";

router.post('/createauction', createAuction);
router.get('/', getAuctions);
router.get('/:id', getAuctionById);
router.post('/:id/bid', processBid);

export default router; 
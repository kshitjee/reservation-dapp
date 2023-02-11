import express from "express";
const router = express.Router()
import {
  registerVendor,
  loginVendor,
  getVendors,
  getVendorById,
} from "../controllers/vendorControllers.js";

router.post('/signup', registerVendor);
router.post('/login', loginVendor);
router.get('/', getVendors);
router.get('/:id', getVendorById);

export default router;
import express from "express";
const router = express.Router()
import {
  registerVendor,
  loginVendor,
  getVendors,
  getVendorById,
  updateVendorPublicAddress,
} from "../controllers/vendorControllers.js";

router.post('/signup', registerVendor);
router.post('/login', loginVendor);
router.get('/', getVendors);
router.get('/:id', getVendorById);
router.post('/:id/updatepublicaddress', updateVendorPublicAddress);

export default router;
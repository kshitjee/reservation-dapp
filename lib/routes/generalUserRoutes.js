import express from "express";
const router = express.Router()
import {registerGeneralUser, loginGeneralUser, getGeneralUsers, getGeneralUserById, updateGeneralUserPublicAddress} from "../controllers/generalUserControllers.js";

router.post('/signup', registerGeneralUser);
router.post('/login', loginGeneralUser);
router.get('/', getGeneralUsers);
router.get('/:id', getGeneralUserById);
router.post('/:id/updatepublicaddress', updateGeneralUserPublicAddress);

export default router;
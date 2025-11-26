import express from "express";
import { register, login, logout, updateProfile, googleAuth, getRecommendations, updatePreferences } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.middleware.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();


router.post("/register",singleUpload, register)

router.post("/login", login)
// Allow logout to be called without authentication so the client can always clear the cookie
router.get("/logout", logout)
router.post("/updateProfile", isAuthenticated,singleUpload, updateProfile)
router.post("/google-auth", googleAuth)
router.get("/recommendations", isAuthenticated, getRecommendations)
router.put("/preferences", isAuthenticated, updatePreferences)


export default router;
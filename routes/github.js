import express from "express";
import { getGithubUser } from "../controllers/github.js";


const router = express.Router();

router.get("/user/:username", getGithubUser);

export default router;
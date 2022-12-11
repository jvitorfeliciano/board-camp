import { Router } from "express";
import { getGames } from "../controllers/gamesController.js";
import gameValidation from "../middlewares/gameMiddleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", gameValidation);
export default gamesRouter;

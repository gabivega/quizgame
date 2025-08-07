"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Score_1 = __importDefault(require("../models/Score"));
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const { name, score, category } = req.body;
        if (!name || score === undefined) {
            return res.status(400).json({ error: "Name and score are required." });
        }
        console.log("name: ", name, "score: ", score, "category", category);
        const newScore = new Score_1.default({ name, score, category });
        await newScore.save();
        // //obtener el ranking
        // const higherScores = await Score.countDocuments({score : {$gte: score}});
        // const position = higherScores + 1;
        res.status(201).json({ message: "Score Saved" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Error desconocido" });
        }
    }
});
router.get('/:category', async (req, res) => {
    try {
        const category = req.params.category;
        console.log(category);
        if (category === "all") {
            const scores = await Score_1.default.find();
            return res.status(200).json(scores);
        }
        const scores = await Score_1.default.find({ category: category });
        res.status(200).json(scores);
    }
    catch (error) {
        res.status(500).json({ error: "Error al resolver la solicitud" });
    }
});
router.post('/getPosition', async (req, res) => {
    try {
        const { score } = req.body;
        if (score === undefined) {
            return res.status(400).json({ error: "Score are required." });
        }
        //obtener el ranking
        const higherScores = await Score_1.default.countDocuments({ score: { $gte: score } });
        const position = higherScores + 1;
        res.status(200).json({ message: "Position", position });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.default = router;

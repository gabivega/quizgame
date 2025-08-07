"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Scores_1 = __importDefault(require("./Routes/Scores"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 5000;
const HOST = process.env.HOST || 'localhost';
if (process.env.NODE_ENV === 'production') {
    const privateKey = fs_1.default.readFileSync('/etc/letsencrypt/live/quizapi.gabivega.tech/privkey.pem', 'utf8');
    const certificate = fs_1.default.readFileSync('/etc/letsencrypt/live/quizapi.gabivega.tech/fullchain.pem', 'utf8');
    const credentials = { key: privateKey, cert: certificate };
    https_1.default.createServer(credentials, app).listen(443, () => {
        console.log('🚀 Server HTTPS running on port 443');
    });
}
else {
    http_1.default.createServer(app).listen(PORT, () => {
        console.log(`🚀 Server HTTP running on http://${HOST}:${PORT}`);
    });
}
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
const mongoURL = process.env.MONGO_DB_URL;
if (!mongoURL) {
    throw new Error('La variable de entorno MONGO_DB_URL no está definida');
}
// Conexión a MongoDB Atlas
mongoose_1.default.connect(mongoURL)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Error al conectar MongoDB', err));
app.get('/', (req, res) => {
    res.send('servidor funcionando');
});
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});
function generateId(length = 4) {
    const chars = "0123456789";
    const id = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    console.log(id);
    return id;
}
let questions = [];
app.get('/api/questions', async (req, res) => {
    try {
        const category = req.query.category;
        console.log("categoria: ", category);
        const response = await fetch(`https://opentdb.com/api.php?amount=20&category=${category}`);
        const data = await response.json();
        const questionsWithId = data.results.map((q) => ({
            ...q,
            id: generateId(4)
        }));
        questions = questionsWithId;
        // console.log(questionsWithId)
        res.json(questionsWithId);
        // res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener preguntas' });
    }
});
app.post('/api/answers', async (req, res) => {
    try {
        const { selectedOption, questionId } = req.body;
        console.log(selectedOption, questionId);
        const question = questions.find(q => q.id === questionId);
        if (!question) {
            return res.status(404).json({ error: "Pregunta no encontrada" });
        }
        const isCorrect = selectedOption === question.correct_answer;
        res.json({ "question": question.correct_answer, "isCorrect": isCorrect });
    }
    catch (error) {
        res.status(500).json({ error: "Error al procesar la respuesta" });
    }
});
app.use('/api/scores', Scores_1.default);
app.use('/api/scores', Scores_1.default);

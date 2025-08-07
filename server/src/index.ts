import express, {Request, Response } from 'express';
import cors from 'cors';
import { Question } from './interfaces/Question';
import scoreRoutes from './Routes/Scores';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';


const app = express();

const privateKey = fs.readFileSync('/etc/letsencrypt/live/quizgame.gabivega.tech/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/quizgame.gabivega.tech/fullchain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const PORT = 5000;
app.use(cors());
app.use(express.json());
dotenv.config();
const mongoURL = process.env.MONGO_DB_URL;

if (!mongoURL) {
  throw new Error('La variable de entorno MONGO_DB_URL no está definida');
}

// Conexión a MongoDB Atlas
mongoose.connect(mongoURL)
.then(() => console.log('MongoDB conectado'))
.catch((err) => console.error('Error al conectar MongoDB', err));

app.get('/',(req: Request, res: Response)=> {
    res.send('servidor funcionando')
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(5000, () => {
  console.log('Servidor HTTPS corriendo en el puerto 5000');
});

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

function generateId(length = 4): string {
    const chars = "0123456789";
    const id = Array.from({ length}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    console.log(id);
    return id;
}
let questions:Question[] = [];

app.get('/api/questions', async (req: Request, res: Response) => {
    try {
        const category = req.query.category as string;
        console.log("categoria: " ,category)
        const response = await fetch(`https://opentdb.com/api.php?amount=20&category=${category}`);
        const data = await response.json();
        const questionsWithId = data.results.map((q: any) => (
            {
                ...q,
                id: generateId(4)
            }
        ))
        questions = questionsWithId;
        // console.log(questionsWithId)
        res.json(questionsWithId);
        // res.json(data);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener preguntas'})
    }
})
const currentScore = 0;

app.post('/api/answers', async (req: Request, res: Response) => {
    try {
        const { selectedOption, questionId} = req.body;
        console.log(selectedOption, questionId)
        const question = questions.find(q => q.id === questionId);
        if (!question) {
            return res.status(404).json({error:"Pregunta no encontrada"})
        }
        const isCorrect = selectedOption === question.correct_answer;
        // if (isCorrect) {
        //     handleScore(currentScore);
        //     console.log("respuesta correcta: ", question.correct_answer)
        // }

        res.json({"question":question.correct_answer, "isCorrect": isCorrect})

    } catch (error) {
        res.status(500).json({error: "Error al procesar la respuesta"})
    }
})

app.use('/api/scores', scoreRoutes);
app.use('/api/scores', scoreRoutes);

// app.listen(PORT, '0.0.0.0',() => {
//     console.log(`Servidor corriendo en puerto : ${PORT}`)
// })

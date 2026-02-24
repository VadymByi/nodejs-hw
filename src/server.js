import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB';
import { Note } from './models/note';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
import { notFoundHandler } from './middleware/notFoundHandler';
import notesRoutes from './routes/notesRoutes';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

app.use(
  express.json({
    type: ['aplication/json', 'application/vnd.api+json'],
  }),
);
app.use(
  express.json({
    limit: '100kb',
  }),
);

app.use(notesRoutes);

// app.get('/notes', async (req, res) => {
//   const notes = await Note.find();
//   res.status(200).json(notes);
// });

// app.get('/notes/:noteId', async (req, res) => {
//   const { noteId } = req.params;
//   const note = await Note.findById(noteId);

//   if (!note) {
//     return res.status(404).json({ message: 'Note not found' });
//   }
//   res.status(200).json(note);
// });

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

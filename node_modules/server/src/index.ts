import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import { rateLimit } from 'express-rate-limit';

import { authRouter } from './routes/auth';
import { dashboardRouter } from './routes/dashboard';
import { insightsRouter } from './routes/insights';
import { campaignsRouter } from './routes/campaigns';
import { chatRouter } from './routes/chat';
import { demoRouter } from './routes/demo';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173'], // Vite default
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use('/api', limiter);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/insights', insightsRouter);
app.use('/api/v1/campaigns', campaignsRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/demo', demoRouter);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

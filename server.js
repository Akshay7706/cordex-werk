import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase Client
let supabase;
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('CRITICAL: Supabase keys are missing in .env file!');
} else {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  console.log('Connected to Supabase Cloud Database.');
}

// =======================
// API ROUTES
// =======================

// Database Check Middleware
app.use('/api', (req, res, next) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Database not connected. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel Environment Variables.' });
  }
  next();
});

// 1. CONTACT FORM ENDPOINT
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const { data, error } = await supabase
    .from('messages')
    .insert([{ name, email, message }])
    .select('id');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Simulate a slight delay to show off a realistic loading state on the front-end
  setTimeout(() => {
    res.status(201).json({ success: true, id: data[0].id });
  }, 1200);
});

// 2. METRICS GET ENDPOINT
app.get('/api/metrics', async (req, res) => {
  const { data, error } = await supabase.from('metrics').select('*').order('id', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 3. ORDERS POST ENDPOINT (Checkout Simulation)
app.post('/api/orders', async (req, res) => {
  const { total, items_count, user_id } = req.body;
  const uid = user_id || null;
  
  const { data, error } = await supabase
    .from('orders')
    .insert([{ total, items_count, user_id: uid, status: 'Processed' }])
    .select('id');

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ success: true, orderId: data[0].id });
});

// 4. GET PRODUCTS ENDPOINT
app.get('/api/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 5. POST PRODUCT ENDPOINT (Admin)
app.post('/api/products', async (req, res) => {
  const { name, price, category, image } = req.body;
  
  const { data, error } = await supabase
    .from('products')
    .insert([{ name, price, category, image, in_stock: true }])
    .select('id');

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ success: true, productId: data[0].id });
});

// 6. LOGIN ENDPOINT
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !data) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  
  res.json({ success: true, user: data });
});

// 7. GET MESSAGES ENDPOINT
app.get('/api/messages', async (req, res) => {
  const { data, error } = await supabase.from('messages').select('*').order('id', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 8. DELETE MESSAGE ENDPOINT
app.delete('/api/messages/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// 9. REGISTER ENDPOINT (Customer self-signup)
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });
  
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password, role: 'Customer' }])
    .select('id, email, role');

  if (error) {
    if (error.code === '23505') { // Postgres unique constraint violation
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ success: true, user: data[0] });
});

// 10. GET ORDERS BY USER ENDPOINT
app.get('/api/orders/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('id', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// =======================
// PRODUCTION SERVING
// =======================
// Serve static frontend files from 'dist' folder
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Catch-all route to serve React's index.html for all non-API paths
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Production Serving in standard node (Render/Local)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Cordex Werk Single-Node Stack running on http://localhost:${PORT}`);
  });
}

// Vercel Serverless Export
export default app;

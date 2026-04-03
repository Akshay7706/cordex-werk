import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pkg;

const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
// Fix SSL requirements by stripping them
const cleanUrl = connectionString.split('?')[0];

const client = new Client({
  connectionString: cleanUrl,
  ssl: { rejectUnauthorized: false }
});

async function initSupabase() {
  try {
    await client.connect();
    console.log('Connected to Supabase PostgreSQL Database.');

    // 1. Messages Table (Contact Form)
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created messages table.');

    // 2. Metrics Table (SaaS Dashboard)
    await client.query(`
      CREATE TABLE IF NOT EXISTS metrics (
        id SERIAL PRIMARY KEY,
        month TEXT NOT NULL,
        revenue INTEGER NOT NULL,
        users INTEGER NOT NULL
      )
    `);
    console.log('Created metrics table.');

    // 3. Orders Table (Nova E-Commerce)
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        total DECIMAL(10, 2) NOT NULL,
        items_count INTEGER NOT NULL,
        status TEXT DEFAULT 'Pending',
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created orders table.');

    // 4. Users Table (Authentication)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'Customer',
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created users table.');

    // 5. Products Table (Nova Store)
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL,
        in_stock BOOLEAN DEFAULT TRUE
      )
    `);
    console.log('Created products table.');

    // --- SEED DATA ---
    
    // Seed Metrics
    const metricsRes = await client.query('SELECT COUNT(*) as count FROM metrics');
    if (parseInt(metricsRes.rows[0].count) === 0) {
      const data = [
        ['Jan', 4000, 2400], ['Feb', 3000, 1398], ['Mar', 5000, 9800],
        ['Apr', 4500, 3908], ['May', 6000, 4800], ['Jun', 5500, 3800], ['Jul', 7500, 4300]
      ];
      for (const d of data) {
        await client.query('INSERT INTO metrics (month, revenue, users) VALUES ($1, $2, $3)', d);
      }
      console.log('Seeded metrics data.');
    }

    // Seed Admin User
    const usersRes = await client.query('SELECT COUNT(*) as count FROM users');
    if (parseInt(usersRes.rows[0].count) === 0) {
      await client.query("INSERT INTO users (email, password, role) VALUES ('admin@cordex.com', 'admin123', 'admin')");
      console.log('Seeded default admin user.');
    }

    // Seed Products
    const productsRes = await client.query('SELECT COUNT(*) as count FROM products');
    if (parseInt(productsRes.rows[0].count) === 0) {
      const defaultProducts = [
        ['Monolith Hoodie', 85.00, 'Apparel', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600'],
        ['Aether Sneakers', 140.00, 'Footwear', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600'],
        ['Void Cap', 35.00, 'Accessories', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600'],
        ['Nexus Backpack', 120.00, 'Accessories', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600']
      ];
      for (const p of defaultProducts) {
        await client.query('INSERT INTO products (name, price, category, image) VALUES ($1, $2, $3, $4)', p);
      }
      console.log('Seeded default products.');
    }

    console.log('✅ Supabase initialization complete!');
  } catch (error) {
    console.error('Error during Supabase initialization:', error);
  } finally {
    await client.end();
  }
}

initSupabase();

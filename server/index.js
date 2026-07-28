import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const API_KEY = '9b8xp4y6egpz66izkbkbjh9ozadklon8geg1beg2llmlc41z7qos2sppo3m2my7e';
const SMM_URL = 'https://smmexclusive.com/adminapi/v2/orders';

// Simple ID Obfuscation (XOR)
const OBF_KEY = 123456789;
const encodeId = (id) => parseInt(id, 10) ^ OBF_KEY;
const decodeId = (obfId) => parseInt(obfId, 10) ^ OBF_KEY;

app.get('/api/orders', async (req, res) => {
  try {
    const sayac = req.query.sayac ? parseInt(req.query.sayac) : 0;

    const response = await axios.get(SMM_URL, {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY,
      },
      params: {
        limit: 0,
        offset: sayac * 100,
        provider: "smmviews.net",
        username:"fblivepanel"
      }
    });

    if (response.data.error_code !== 0) {
      return res.status(400).json({ error: response.data.error_message || 'API Error' });
    }

    if (response.data.data && response.data.data.list) {
      response.data.data.list = response.data.data.list.map(order => ({
        ...order,
        id: encodeId(order.id)
      }));
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error in backend fetching orders:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/orders/cancel', async (req, res) => {
  try {
    const { ids, cancel_reason } = req.body;
    const realIds = Array.isArray(ids) ? ids.map(id => decodeId(id)) : ids;
    const response = await axios.post(`${SMM_URL}/cancel`, { ids: realIds, cancel_reason }, {
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders/:id/set-partial', async (req, res) => {
  try {
    const realId = decodeId(req.params.id);
    const { remains } = req.body;
    const response = await axios.post(`${SMM_URL}/${realId}/set-partial`, { remains }, {
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders/change-status', async (req, res) => {
  try {
    const { ids, status } = req.body;
    const realIds = Array.isArray(ids) ? ids.map(id => decodeId(id)) : ids;
    const response = await axios.post(`${SMM_URL}/change-status`, { ids: realIds, status }, {
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders/:id/edit-link', async (req, res) => {
  try {
    const realId = decodeId(req.params.id);
    const { link } = req.body;
    const response = await axios.post(`${SMM_URL}/${realId}/edit-link`, { link }, {
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PUBLIC_API_KEY = 'b9082d1b9449971b05fc7d5fa0b5da6f';
const PUBLIC_API_URL = 'https://smmexclusive.com/api/v2';

app.post('/api/new-order', async (req, res) => {
  try {
    const { service, link, quantity } = req.body;

    // Create form data as required by the public API
    const formData = new URLSearchParams();
    formData.append('key', PUBLIC_API_KEY);
    formData.append('action', 'add');
    formData.append('service', service);
    formData.append('link', link);
    formData.append('quantity', quantity);

    const response = await axios.post(PUBLIC_API_URL, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Orders sayfasındaki gibi aynı XOR şifrelemesini uyguluyoruz
    if (response.data && response.data.order) {
      response.data.order = encodeId(response.data.order);
    }

    res.json(response.data);
  } catch (error) {
    console.error('New Order Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/balance', async (req, res) => {
  try {
    const formData = new URLSearchParams();
    formData.append('key', PUBLIC_API_KEY);
    formData.append('action', 'balance');

    const response = await axios.post(PUBLIC_API_URL, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Balance Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

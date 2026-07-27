import axios from 'axios';

const BASE_URL = 'https://new-panel-vx5g.onrender.com/api/orders';

export const SERVICES = [
  { id: 1, realId: 7238, altRealId: 6623, category: 'Video/Reel Views', name: 'video/Reel views', rate: 0.02 },
  { id: 2, realId: 7239, category: 'Video/Reel Views', name: 'video/Reel views', rate: 0.06 },
  { id: 3, realId: 7223, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (15 Minutes)', rate: 0.30 },
  { id: 4, realId: 7224, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (30 Minutes)', rate: 0.60 },
  { id: 5, realId: 7225, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (60 Minutes)', rate: 1.20 },
  { id: 6, realId: 7226, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (90 Minutes)', rate: 1.80 },
  { id: 7, realId: 7227, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (120 Minutes)', rate: 2.20 },
  { id: 8, realId: 7228, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (150 Minutes)', rate: 2.80 },
  { id: 9, realId: 7229, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (180 Minutes)', rate: 3.20 },
  { id: 10, realId: 7230, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (210 Minutes)', rate: 3.80 },
  { id: 11, realId: 7231, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (240 Minutes)', rate: 4.20 },
  { id: 12, realId: 7232, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (270 Minutes)', rate: 4.80 },
  { id: 13, realId: 7233, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (300 Minutes)', rate: 5.20 },
  { id: 14, realId: 7234, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (330 Minutes)', rate: 5.80 },
  { id: 15, realId: 7235, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (360 Minutes)', rate: 6.20 },
  { id: 16, realId: 7236, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (390 Minutes)', rate: 6.80 },
  { id: 17, realId: 7237, category: 'Live Stream Views', name: 'Facebook Live Stream Viewers (420 Minutes)', rate: 7.40 }
];

export const fetchOrders = async (sayac = 0) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { sayac }
    });
    const allOrders = response.data?.data?.list || [];

    // Inject mapped service name
    return allOrders.map(order => {
      const foundService = SERVICES.find(s => 
        String(s.realId) === String(order.service_id) || 
        String(s.id) === String(order.service_id) ||
        (s.altRealId && String(s.altRealId) === String(order.service_id))
      );
      if (foundService) {
        return { ...order, service_name: foundService.name };
      }
      return order;
    });
  } catch (error) {
    console.error('Error fetching orders via axios:', error.message);
    return [];
  }
};

export const cancelOrder = async (ids, reason) => {
  const response = await axios.post(`${BASE_URL}/cancel`, { ids, cancel_reason: reason });
  return response.data;
};

export const setPartialOrder = async (id, remains) => {
  const response = await axios.post(`${BASE_URL}/${id}/set-partial`, { remains });
  return response.data;
};

export const changeOrderStatus = async (ids, status) => {
  const response = await axios.post(`${BASE_URL}/change-status`, { ids, status });
  return response.data;
};

export const editOrderLink = async (id, link) => {
  const response = await axios.post(`${BASE_URL}/${id}/edit-link`, { link });
  return response.data;
};

export const fetchBalance = async () => {
  try {
    const response = await axios.post('https://new-panel-vx5g.onrender.com/api/balance');
    return response.data;
  } catch (error) {
    console.error('Error fetching balance:', error.message);
    return null;
  }
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
};

const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', body } = options;

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const message =
        (data && (data.error || data.message)) ||
        `Request failed (${response.status} ${response.statusText})`;
      throw new Error(message);
    }

    return data as T;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Server returned invalid JSON response');
    }

    if (error instanceof TypeError) {
      throw new Error(
        'Cannot connect to backend API. Make sure Spring Boot is running on port 8080.',
      );
    }

    throw error;
  }
};

export const fetchRestaurants = async () => {
  return request('/restaurants');
};

export const fetchRestaurantById = async (id: string) => {
  return request(`/restaurants/${id}`);
};

export const fetchRestaurantByOwner = async (ownerId: number) => {
  return request(`/restaurants/owner/${ownerId}`);
};

export const createRestaurant = async (restaurantData: any) => {
  return request('/restaurants', {
    method: 'POST',
    body: restaurantData,
  });
};

export const updateRestaurant = async (id: number, restaurantData: any) => {
  return request(`/restaurants/${id}`, {
    method: 'PUT',
    body: restaurantData,
  });
};

export const addMenuItem = async (restaurantId: number, itemData: any) => {
  return request(`/restaurants/${restaurantId}/menu`, {
    method: 'POST',
    body: itemData,
  });
};

export const deleteMenuItem = async (itemId: number) => {
  return request(`/restaurants/menu/${itemId}`, {
    method: 'DELETE',
  });
};

export const placeOrder = async (orderData: any) => {
  return request('/orders', { method: 'POST', body: orderData });
};

export const fetchOrders = async () => {
  return request('/orders');
};

export const fetchRestaurantOrders = async (restaurantId: number) => {
  return request(`/orders/restaurant/${restaurantId}`);
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  return request(`/orders/${orderId}/status`, {
    method: 'PUT',
    body: status,
  });
};

export const acceptOrder = async (orderId: number, driverData: any) => {
  return request(`/orders/${orderId}/accept`, {
    method: 'PUT',
    body: driverData,
  });
};

// ── Auth API ──────────────────────────────────────
export const signupUser = async (name: string, email: string, password: string, role: string) => {
  return request('/auth/signup', {
    method: 'POST',
    body: { name, email, password, role },
  });
};

export const loginUser = async (email: string, password: string) => {
  return request('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
};

export const fetchProfile = async (userId: number) => {
  return request(`/auth/profile/${userId}`);
};

export const updateProfile = async (userId: number, profileData: { name?: string; email?: string }) => {
  return request(`/auth/profile/${userId}`, {
    method: 'PUT',
    body: profileData,
  });
};

export const fetchAllUsers = async () => {
  return request('/auth/users');
};

export const fetchAllRestaurants = async () => {
  return request('/restaurants');
};

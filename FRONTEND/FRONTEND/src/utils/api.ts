const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error del servidor');
  return data as T;
}

export async function purchaseCoins(usuarioId: string, cantidad: number, metodo_pago?: string, card_last4?: string) {
  return apiFetch<{ usuario: any }>(`/api/users/${usuarioId}/purchase-coins`, {
    method: 'POST',
    body: JSON.stringify({ cantidad, metodo_pago, card_last4 }),
  });
}

export async function sendDonation(params: { usuario_id: string; stream_id: string; regalo_id?: number; monedas_gastadas: number; puntos_ganados: number; mensaje?: string }) {
  return apiFetch<{ usuario: any }>('/api/streams/donations', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function addChatMessage(params: { stream_id: string; usuario_id?: string; alias?: string; nivel?: string; texto: string }) {
  return apiFetch<{ usuario: any }>('/api/streams/chat/messages', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function getUser(userId: string) {
  return apiFetch<any>(`/api/users/${userId}`);
}

export async function getGifts(userId: string) {
  return apiFetch<{ custom: any[]; defaults: any[] }>(`/api/gifts/user/${userId}`);
}

export async function createGift(payload: { nombre: string; icono: string; costo_monedas: number; puntos_otorgados: number; creado_por: string }) {
  return apiFetch<any>('/api/gifts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateGift(id: number, payload: { nombre: string; icono: string; costo_monedas: number; puntos_otorgados: number }) {
  return apiFetch<any>(`/api/gifts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteGift(id: number) {
  return apiFetch<{ success: boolean }>(`/api/gifts/${id}`, {
    method: 'DELETE',
  });
}

export async function registerUser(payload: { nombre: string; username?: string; email?: string; telefono?: string; fecha_nacimiento?: string; password: string }) {
  return apiFetch<any>('/api/users/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginUser(identifier: string, password: string) {
  return apiFetch<any>('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });
}

export async function updateUserServer(userId: string, payload: { monedas?: number; puntos?: number; nivel_actual?: string; horas_streamer?: number }) {
  return apiFetch<{ usuario: any }>(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function createStream(payload: { usuario_id: string; categoria_id?: number | null; titulo: string; descripcion?: string; estado?: string }) {
  return apiFetch<{ id: string }>('/api/streams', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function streamHeartbeat(streamId: string, seconds: number, viewerId?: string) {
  return apiFetch<{ usuario: any }>(`/api/streams/${streamId}/heartbeat`, {
    method: 'POST',
    body: JSON.stringify({ seconds, viewerId }),
  });
}

export async function endStream(streamId: string) {
  return apiFetch<{ success: boolean }>(`/api/streams/${streamId}/end`, {
    method: 'POST',
  });
}

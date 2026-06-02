import { getUsers, saveUsers, createUser, verifyCredentials } from './storage';
import type { User } from './storage';
import { DEFAULT_VIEWER_LEVELS } from './leveling';

const DEFAULT_GIFTS_SERVER = [
  { id: 1, nombre: 'Rosa', icono: '🌹', costo_monedas: 10, puntos_otorgados: 5, creado_por: null },
  { id: 2, nombre: 'Corazón', icono: '❤️', costo_monedas: 50, puntos_otorgados: 25, creado_por: null },
  { id: 3, nombre: 'Fuego', icono: '🔥', costo_monedas: 100, puntos_otorgados: 60, creado_por: null },
  { id: 4, nombre: 'Diamante', icono: '💎', costo_monedas: 500, puntos_otorgados: 300, creado_por: null },
];

function toServerUser(u: User) {
  return {
    id: u.id,
    nombre: u.name,
    username: u.username || null,
    email: u.email || null,
    telefono: u.phone || null,
    fecha_nacimiento: u.dob || null,
    monedas: u.coins,
    puntos: u.points,
    nivel_actual: u.nivel_actual || 'Bronce',
    horas_streamer: u.streamerHours || 0,
  };
}

function computeViewerLevel(points: number): string {
  for (let i = DEFAULT_VIEWER_LEVELS.length - 1; i >= 0; i--) {
    if (points >= DEFAULT_VIEWER_LEVELS[i].points) {
      return DEFAULT_VIEWER_LEVELS[i].name;
    }
  }
  return DEFAULT_VIEWER_LEVELS[0]?.name || 'Bronce';
}

function findUserById(id: string) {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) throw new Error('Usuario no encontrado');
  return { users, idx, user: users[idx] };
}

function saveAndReturnUser(users: User[], idx: number) {
  saveUsers(users);
  return { usuario: toServerUser(users[idx]) };
}

const _streams = new Map<string, {
  id: string; usuario_id: string; titulo: string; descripcion: string; estado: string; fecha_inicio: string; seconds: number;
}>();

let _streamIdCounter = 0;

export async function purchaseCoins(usuarioId: string, cantidad: number, _metodo_pago?: string, _card_last4?: string) {
  const { users, idx } = findUserById(usuarioId);
  users[idx].coins += cantidad;
  return saveAndReturnUser(users, idx);
}

export async function sendDonation(params: { usuario_id: string; stream_id: string; regalo_id?: number; monedas_gastadas: number; puntos_ganados: number; mensaje?: string }) {
  const { users, idx } = findUserById(params.usuario_id);
  if (users[idx].coins < params.monedas_gastadas) throw new Error('Monedas insuficientes');
  users[idx].coins -= params.monedas_gastadas;
  users[idx].points += params.puntos_ganados;
  users[idx].nivel_actual = computeViewerLevel(users[idx].points);
  return saveAndReturnUser(users, idx);
}

export async function addChatMessage(params: { stream_id: string; usuario_id?: string; alias?: string; nivel?: string; texto: string }) {
  if (!params.usuario_id) return { usuario: { puntos: 0, nivel_actual: 'Bronce' } };
  const { users, idx } = findUserById(params.usuario_id);
  users[idx].points += 1;
  users[idx].nivel_actual = computeViewerLevel(users[idx].points);
  return saveAndReturnUser(users, idx);
}

export async function getUser(userId: string) {
  const { user } = findUserById(userId);
  return toServerUser(user);
}

export async function getGifts(userId: string) {
  const { user } = findUserById(userId);
  const custom = (user.customGifts || []).map((g: any) => ({
    id: g.id,
    nombre: g.name,
    icono: g.icon,
    costo_monedas: g.cost,
    puntos_otorgados: g.points,
    creado_por: userId,
  }));
  return { custom, defaults: DEFAULT_GIFTS_SERVER };
}

export async function createGift(payload: { nombre: string; icono: string; costo_monedas: number; puntos_otorgados: number; creado_por: string }) {
  const { users, idx } = findUserById(payload.creado_por);
  const id = Date.now() + Math.floor(Math.random() * 1000);
  const gift = { id: String(id), name: payload.nombre, icon: payload.icono, cost: payload.costo_monedas, points: payload.puntos_otorgados };
  users[idx].customGifts = [...(users[idx].customGifts || []), gift];
  saveUsers(users);
  return { id, nombre: payload.nombre, icono: payload.icono, costo_monedas: payload.costo_monedas, puntos_otorgados: payload.puntos_otorgados };
}

export async function updateGift(id: number, payload: { nombre: string; icono: string; costo_monedas: number; puntos_otorgados: number }) {
  const users = getUsers();
  const sid = String(id);
  for (const u of users) {
    const gifts = u.customGifts || [];
    const gIdx = gifts.findIndex((g: any) => g.id === sid || g.id === id);
    if (gIdx !== -1) {
      gifts[gIdx] = { ...gifts[gIdx], name: payload.nombre, icon: payload.icono, cost: payload.costo_monedas, points: payload.puntos_otorgados };
      saveUsers(users);
      return { id, nombre: payload.nombre, icono: payload.icono, costo_monedas: payload.costo_monedas, puntos_otorgados: payload.puntos_otorgados };
    }
  }
  throw new Error('Regalo no encontrado');
}

export async function deleteGift(id: number) {
  const users = getUsers();
  const sid = String(id);
  for (const u of users) {
    const before = (u.customGifts || []).length;
    u.customGifts = (u.customGifts || []).filter((g: any) => g.id !== sid && g.id !== id);
    if (u.customGifts.length < before) {
      saveUsers(users);
      return { success: true };
    }
  }
  throw new Error('Regalo no encontrado');
}

export async function registerUser(payload: { nombre: string; username?: string; email?: string; telefono?: string; fecha_nacimiento?: string; password: string }) {
  const user = createUser({
    name: payload.nombre,
    username: payload.username,
    email: payload.email,
    phone: payload.telefono,
    dob: payload.fecha_nacimiento,
    password: payload.password,
  });
  return toServerUser(user);
}

export async function loginUser(identifier: string, password: string) {
  const user = verifyCredentials(identifier, password);
  if (!user) throw new Error('Credenciales inválidas');
  return toServerUser(user);
}

export async function updateUserServer(userId: string, payload: { monedas?: number; puntos?: number; nivel_actual?: string; horas_streamer?: number }) {
  const { users, idx } = findUserById(userId);
  if (payload.monedas !== undefined) users[idx].coins = payload.monedas;
  if (payload.puntos !== undefined) users[idx].points = payload.puntos;
  if (payload.nivel_actual !== undefined) users[idx].nivel_actual = payload.nivel_actual;
  if (payload.horas_streamer !== undefined) users[idx].streamerHours = payload.horas_streamer;
  return saveAndReturnUser(users, idx);
}

export async function createStream(payload: { usuario_id: string; categoria_id?: number | null; titulo: string; descripcion?: string; estado?: string }) {
  _streamIdCounter++;
  const id = String(_streamIdCounter);
  const stream = {
    id,
    usuario_id: payload.usuario_id,
    titulo: payload.titulo,
    descripcion: payload.descripcion || '',
    estado: payload.estado || 'en_vivo',
    fecha_inicio: new Date().toISOString(),
    seconds: 0,
  };
  _streams.set(id, stream);
  return { id };
}

export async function streamHeartbeat(streamId: string, seconds: number, viewerId?: string) {
  const stream = _streams.get(streamId);
  if (!stream) throw new Error('Stream no encontrado');
  stream.seconds += seconds;

  const { users, idx } = findUserById(stream.usuario_id);

  if (viewerId === stream.usuario_id) {
    users[idx].streamerHours = (users[idx].streamerHours || 0) + seconds / 3600;
    users[idx].points = Math.floor((users[idx].points || 0) + seconds * 0.01);
    users[idx].nivel_actual = computeViewerLevel(users[idx].points);
  }

  saveUsers(users);
  return {
    usuario: {
      horas_streamer: users[idx].streamerHours || 0,
      puntos: Math.floor(users[idx].points || 0),
      nivel_actual: users[idx].nivel_actual || 'Bronce',
    }
  };
}

export async function endStream(streamId: string) {
  const stream = _streams.get(streamId);
  if (stream) stream.estado = 'finalizado';
  return { success: true };
}

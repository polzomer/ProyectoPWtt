import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getActiveUser, updateUser } from '../utils/storage';
import { getLevelInfo, DEFAULT_VIEWER_LEVELS } from '../utils/leveling';
import { useNotification } from '../context/NotificationContext';
import './Chat.css';
import { addChatMessage, getUser } from '../utils/api';

interface Message {
  id: number;
  user: string;
  level: string;
  text: string;
}

const RANDOM_USERS_GENERIC = ['NinjaFan', 'GamerX', 'ArtLover', 'MusicMan', 'StreamFan123', 'RandomUser'];
const RANDOM_MESSAGES = ['¡Qué buena jugada!', 'jajaja, muy bueno', '¡Saludos desde Perú!', 'Me encanta este stream', 'F', 'Pog', 'Nice!', '¿Alguien sabe la canción?'];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: Date.now(), user: 'Admin', level: 'Dios', text: '¡Bienvenidos al stream!' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(getActiveUser());
  const { showNotification } = useNotification();
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const { streamId } = useParams();

  // Simula mensajes de espectadores aleatorios cada 5 segundos
  useEffect(() => {
    let mounted = true;
    let timer: number | undefined;
    const pushSpectator = () => {
      if (!mounted) return;
      const effectiveLevels = DEFAULT_VIEWER_LEVELS;
      const randomUserName = RANDOM_USERS_GENERIC[Math.floor(Math.random() * RANDOM_USERS_GENERIC.length)];
      const randomLevel = (effectiveLevels[Math.floor(Math.random() * effectiveLevels.length)]?.name) || 'Bronce';
      const randomMessageText = RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];
      const spectatorMessage: Message = { id: Date.now(), user: randomUserName, level: randomLevel, text: randomMessageText };
      setMessages(prev => [...prev, spectatorMessage]);
      timer = window.setTimeout(pushSpectator, 5000);
    };
    pushSpectator();
    return () => { mounted = false; if (timer) window.clearTimeout(timer); };
  }, []);

  // Sincroniza el usuario activo cuando cambia (login/logout)
  useEffect(() => {
    const handler = () => setUser(getActiveUser());
    window.addEventListener('userChanged', handler);
    return () => window.removeEventListener('userChanged', handler);
  }, []);

  // Auto-scroll al último mensaje si el usuario está cerca del final
  useEffect(() => {
    if (chatMessagesRef.current) {
      const el = chatMessagesRef.current;
      const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (distanceToBottom < 10) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const oldLevelName = getLevelInfo(user.points).currentLevelName;
    const sidSession = sessionStorage.getItem('current_stream_id') || '';
    const sidCandidate = sidSession || (streamId || '');
    const sid = sidCandidate || `virtual-${user.id}`;
    await addChatMessage({ stream_id: sid, usuario_id: user.id, alias: user.name, nivel: oldLevelName, texto: newMessage.trim() });
    const refreshed = await getUser(user.id);
    const newLevelName = refreshed.nivel_actual || getLevelInfo(refreshed.puntos).currentLevelName;
    // Notifica al usuario si subió de nivel al enviar un mensaje
    if (oldLevelName !== newLevelName) {
      updateUser({ ...user, points: refreshed.puntos, nivel_actual: newLevelName } as any);
      showNotification(`🎉 ¡Felicidades, ${user.name}! 🎉\n\nHas subido al nivel de espectador: ${newLevelName}`);
    } else {
      updateUser({ ...user, points: refreshed.puntos, nivel_actual: newLevelName } as any);
    }

    const message: Message = {
      id: Date.now(),
      user: user.name,
      level: newLevelName,
      text: newMessage.trim(),
    };
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    window.dispatchEvent(new CustomEvent("userChanged"));
  };

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map(msg => (
          <div key={msg.id} className="chat-message">
            <span className="user-level-badge">{msg.level}</span>
            <strong className="user-name">{msg.user}:</strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {user ? (
        <form onSubmit={handleSendMessage} className="chat-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enviar un mensaje..."
            className="chat-input"
          />
          <button type="submit" className="send-button">Enviar</button>
        </form>
      ) : (
        <div className="chat-login-prompt">
          <p>Inicia sesión para chatear.</p>
        </div>
      )}
    </div>
  );
}

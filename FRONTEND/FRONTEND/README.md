# Streaming-UL

Plataforma de streaming en vivo tipo TikTok Live, desarrollada como proyecto universitario. Permite a los usuarios registrarse, ver streams, chatear, enviar regalos virtuales, seguir streamers y gestionar su perfil con un sistema de niveles y monedas.

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 19.1.1 | UI / componentes |
| TypeScript | 5.9.3 | Tipado estático |
| Vite | 7.1.7 | Build tool / dev server |
| React Router DOM | 7.9.3 | Enrutamiento SPA |
| Bootstrap 5 | 5.3.8 | Framework CSS |
| react-bootstrap | 2.10.10 | Componentes Bootstrap para React |
| Chart.js | 4.5.1 | Gráficos estadísticos |
| react-chartjs-2 | 5.3.0 | Wrapper de Chart.js para React |
| react-icons | 5.5.0 | Biblioteca de iconos |
| ESLint | 9.36.0 | Linter |

> **Nota:** El frontend funciona completamente en localStorage, sin necesidad de backend. Los datos persisten en el navegador del usuario.

---

## Estructura del Proyecto

```
FRONTEND/
├── index.html                  # Entry point HTML (carga main.tsx)
├── package.json                # Dependencias y scripts
├── vite.config.ts              # Configuración de Vite
├── tsconfig.json               # Configuración raíz de TypeScript
├── tsconfig.app.json           # TS config para la app React
├── tsconfig.node.json          # TS config para vite.config.ts
├── eslint.config.js            # Reglas de ESLint
├── public/
│   └── vite.svg                # Favicon
├── docs/
│   └── sketches/               # Mockups y diseños de UI
└── src/
    ├── main.tsx                # Punto de entrada de React
    ├── App.tsx                 # Router principal y layout
    ├── App.css                 # Estilos del layout global
    ├── index.css               # Estilos base y variables CSS
    ├── assets/
    │   └── react.svg
    ├── context/
    │   ├── ThemeContext.tsx     # Contexto de tema claro/oscuro
    │   ├── NotificationContext.tsx  # Contexto de notificaciones toast
    │   └── AlertContext.tsx     # Contexto de alertas de regalos
    ├── utils/
    │   ├── types.ts            # Interfaces compartidas
    │   ├── storage.ts          # Persistencia en localStorage
    │   ├── api.ts              # Mock API sobre localStorage
    │   ├── leveling.ts         # Sistema de niveles y progresión
    │   ├── validators.ts       # Validaciones de formularios
    │   └── mockData.ts         # Datos mock de streamers
    ├── components/
    │   ├── Sidebar.tsx         # Barra lateral de navegación
    │   ├── Sidebar.css
    │   ├── RightSidebar.tsx    # Panel lateral derecho (usuario/guest)
    │   ├── RightSidebar.css
    │   ├── Chat.tsx            # Chat en vivo de streams
    │   ├── Chat.css
    │   ├── DepositModal.tsx    # Modal de recarga de monedas
    │   ├── DepositModal.css
    │   ├── PaymentModal.tsx    # Modal de método de pago
    │   ├── PaymentModal.css
    │   ├── GiftModal.tsx       # Modal de envío de regalos
    │   ├── GiftModal.css
    │   ├── GiftFormModal.tsx   # Modal para crear/editar regalos personalizados
    │   ├── GiftFormModal.css
    │   ├── GiftAlert.tsx       # Overlay de alerta al recibir un regalo
    │   ├── GiftAlert.css
    │   ├── Notification.tsx    # Toast de notificación
    │   ├── Notification.css
    │   ├── HeaderUser.tsx      # Componente header (actualmente vacío)
    │   └── LevelBar.tsx        # Barra de progreso de nivel
    └── pages/
        ├── Home.tsx            # Página principal / feed
        ├── Home.css
        ├── Login.tsx           # Inicio de sesión
        ├── Login.css
        ├── Register.tsx        # Registro de usuarios
        ├── ExplorarPage.tsx    # Explorar contenido
        ├── ExplorarPage.css
        ├── DestacadosPage.tsx  # Contenido destacado
        ├── DestacadosPage.css
        ├── CategoryPage.tsx    # Página por categoría
        ├── CategoryPage.css
        ├── ClipPage.tsx        # Reproductor de clips
        ├── ClipPage.css
        ├── ProfilePage.tsx     # Perfil del usuario
        ├── ProfilePage.css
        ├── StreamSetupPage.tsx # Configuración previa al stream
        ├── StreamSetupPage.css
        ├── StreamPage.tsx      # Vista de stream (espectador)
        ├── StreamPage.css
        ├── LiveDashboardPage.tsx   # Dashboard del streamer en vivo
        ├── LiveDashboardPage.css
        ├── GiftManagementPage.tsx  # CRUD de regalos personalizados
        ├── GiftManagementPage.css
        ├── CommunitySettingsPage.tsx # Configuración de la comunidad
        ├── CommunitySettingsPage.css
        ├── LevelsPage.tsx      # Tabla de niveles del sistema
        ├── LevelsPage.css
        ├── StatsPage.tsx       # Estadísticas con gráficos
        ├── StatsPage.css
        ├── Mensajes.tsx        # Página de mensajes (placeholder)
        ├── Perfil.tsx          # Página de perfil (placeholder)
        ├── Nosotros.tsx        # Página "Sobre nosotros"
        ├── Nosotros.css
        ├── ForgotPassword.tsx  # Recuperación de contraseña
        ├── TyC.tsx             # Términos y condiciones
        └── TyC.css
```

---

## Scripts Disponibles

```bash
npm run dev       # Inicia servidor de desarrollo en localhost:5173
npm run build     # Compila TypeScript + build de producción en dist/
npm run preview   # Previsualiza el build de producción
npm run lint      # Ejecuta ESLint sobre el código fuente
```

---

## Descripción Detallada de Cada Archivo

### Archivos Raíz

| Archivo | Descripción |
|---|---|
| `index.html` | HTML base. Incluye la fuente Poppins de Google Fonts y el punto de montaje `<div id="root">`. Carga `src/main.tsx` como módulo ES. |
| `package.json` | Define el nombre del proyecto (`tiktok-ulima`), scripts (`dev`, `build`, `lint`, `preview`) y todas las dependencias (React, React Router, Bootstrap, Chart.js, etc.). |
| `vite.config.ts` | Configuración mínima de Vite con el plugin de React. Sin proxy ni configuraciones adicionales. |
| `tsconfig.json` | Archivo raíz de TypeScript que referencia `tsconfig.app.json` y `tsconfig.node.json`. |
| `tsconfig.app.json` | Configuración de TypeScript para la app: target ES2022, JSX react-jsx, strict mode, verbatimModuleSyntax, y otros flags estrictos. |
| `tsconfig.node.json` | Configuración de TypeScript para archivos del entorno Node (vite.config.ts). Target ES2023, incluye tipos de Node. |
| `eslint.config.js` | Configuración de ESLint con flat config. Extiende recomendados de JS, TypeScript, React Hooks y React Refresh. Ignora `dist/`. |

### Punto de Entrada (`src/`)

#### `main.tsx`
Punto de entrada de la aplicación. Renderiza el árbol completo de providers:
- `BrowserRouter` — enrutamiento del lado cliente
- `ThemeProvider` — control de tema claro/oscuro
- `NotificationProvider` — notificaciones tipo toast
- `AlertProvider` — alertas visuales de regalos recibidos

Monta todo en el elemento `#root`.

#### `App.tsx`
Componente raíz que define dos grupos de rutas:
- **Rutas públicas** (sin layout): `/login`, `/register`, `/forgot-password`
- **Rutas protegidas** (con `MainLayout`): todas las demás rutas

`MainLayout` renderiza un grid de 3 columnas: `Sidebar` (250px), contenido principal y `RightSidebar` (280px). Incluye un botón flotante para ocultar/mostrar la RightSidebar.

#### `App.css`
Define las variables CSS para tema oscuro y claro (`--bg-main`, `--accent`, `--text-primary`, etc.), el layout grid de 3 columnas con transición suave, y media queries responsivas (tablet 1200px, móvil 768px).

#### `index.css`
Estilos base globales: fuente Poppins, colores según preferencia del sistema, estilos de botones, y clases utilitarias para barras de nivel (`.level`, `.level__bar`, `.level__barFill`).

### Contextos (`src/context/`)

#### `ThemeContext.tsx`
- **`ThemeProvider`** — Almacena el estado del tema (`'dark'` | `'light'`). Al cambiar, actualiza `document.documentElement.setAttribute('data-theme', theme)`, lo que activa las variables CSS correspondientes.
- **`useTheme()`** — Hook que expone `{ theme, toggleTheme }`.
- **Propósito**: Permitir cambio de tema claro/oscuro en toda la app.

#### `NotificationContext.tsx`
- **`NotificationProvider`** — Mantiene un mensaje de notificación en estado. Cuando se activa, renderiza el componente `<Notification>`.
- **`useNotification()`** — Hook que expone `{ showNotification }`.
- **Propósito**: Mostrar notificaciones temporales (ej. subida de nivel, error).

#### `AlertContext.tsx`
- **`AlertProvider`** — Mantiene información de alerta (`{ userName, giftName, giftIcon }`). Cuando se activa, renderiza `<GiftAlert>`.
- **`useAlert()`** — Hook que expone `{ showAlert }`.
- **Propósito**: Mostrar alertas visuales cuando un usuario recibe un regalo durante un stream.

### Utilidades (`src/utils/`)

#### `types.ts`
Interfaces compartidas:
- **`Gift`**: `{ id, name, icon, cost, points }` — Representa un regalo virtual.
- **`LevelConfig`**: `{ name, points }` — Define un nivel con su nombre y umbral de puntos.

#### `storage.ts`
Sistema de persistencia de usuarios en localStorage. Exporta:

| Función | Descripción |
|---|---|
| **`getUsers()`** | Obtiene todos los usuarios registrados desde localStorage (`pw_users`). |
| **`saveUsers(users)`** | Guarda el array completo de usuarios en localStorage. |
| **`getActiveUser()`** | Retorna el usuario activo (desde localStorage o sessionStorage según si marcó "Recordar sesión"). |
| **`setActiveUser(u)`** | Guarda el usuario activo en localStorage. |
| **`clearActiveUser()`** | Elimina el usuario activo de ambos storages. |
| **`findUserByEmail(email)`** | Busca un usuario por email (case-insensitive). |
| **`findUserByUsername(username)`** | Busca un usuario por nombre de usuario (case-insensitive). |
| **`createUser(u)`** | Crea un nuevo usuario con `crypto.randomUUID()`, coins=0, points=0, nivel='Bronce', y arrays vacíos. La contraseña se almacena en base64 (`btoa`). |
| **`verifyCredentials(identifier, password)`** | Verifica credenciales contra localStorage. Compara contraseña en base64. |
| **`updateUser(u)`** | Persiste cambios en el usuario y actualiza el active user si corresponde. |
| **`toggleFollowStreamer(streamerId)`** | Agrega o remueve un streamer de la lista de seguidos. Dispara evento `userChanged`. |

**Interfaz `User`**: `{ id, name, username, email, phone, dob, password, coins, points, nivel_actual, likedVideos, streamerHours, customGifts, viewerLevelConfig, following }`

#### `api.ts`
Capa de API mock que reemplaza las llamadas HTTP al backend con operaciones sobre localStorage. Cada función es asíncrona y retorna el mismo formato que el backend original.

| Función | Descripción |
|---|---|
| **`purchaseCoins(usuarioId, cantidad)`** | Agrega monedas al usuario y retorna `{ usuario: { monedas, puntos } }`. |
| **`sendDonation(params)`** | Deduce monedas, suma puntos, recalcula nivel. Retorna `{ usuario: { monedas, puntos, nivel_actual } }`. |
| **`addChatMessage(params)`** | Suma 1 punto por mensaje de chat. Retorna `{ usuario: { puntos, nivel_actual } }`. |
| **`getUser(userId)`** | Retorna datos del usuario en formato servidor `{ id, nombre, username, ... }`. |
| **`getGifts(userId)`** | Retorna los regalos personalizados del usuario y los regalos por defecto: `{ custom, defaults }`. |
| **`createGift(payload)`** | Crea un regalo personalizado y lo guarda en el usuario. Retorna el regalo creado. |
| **`updateGift(id, payload)`** | Actualiza un regalo personalizado existente. |
| **`deleteGift(id)`** | Elimina un regalo personalizado del usuario. |
| **`registerUser(payload)`** | Registra un nuevo usuario vía `createUser()` y retorna datos en formato servidor. |
| **`loginUser(identifier, password)`** | Verifica credenciales vía `verifyCredentials()` y retorna datos en formato servidor. |
| **`createStream(payload)`** | Crea un stream en memoria (Map interno). Retorna `{ id }`. |
| **`streamHeartbeat(streamId, seconds, viewerId?)`** | Acumula tiempo de stream. Si es el streamer, suma horas de streamer y puntos. Retorna `{ usuario: { horas_streamer, puntos, nivel_actual } }`. |
| **`endStream(streamId)`** | Marca el stream como finalizado. |

Funciones auxiliares internas:
- **`toServerUser(u)`**: Convierte `User` (formato local) a formato servidor (`{ id, nombre, username, email, telefono, fecha_nacimiento, monedas, puntos, nivel_actual, horas_streamer }`).
- **`computeViewerLevel(points)`**: Calcula el nombre del nivel según los puntos acumulados contra `DEFAULT_VIEWER_LEVELS`.
- **`findUserById(id)`**: Busca usuario por ID, retorna `{ users, idx, user }` o lanza error.
- **`saveAndReturnUser(users, idx)`**: Guarda cambios y retorna `{ usuario: toServerUser(users[idx]) }`.

#### `leveling.ts`
Sistema de niveles para espectadores y streamers.

**Constantes:**
- **`DEFAULT_VIEWER_LEVELS`**: Array de 10 niveles generado dinámicamente:
  - Nombres: `Bronce`, `Plata`, `Oro`, `Diamante`, `Maestro I-V`, `Dios`
  - Progresión geométrica: base 50 puntos, crecimiento 30% por nivel.
  - Ejemplo: Bronce=0, Plata=50, Oro=100, Diamante=165, Maestro I=265...

- **`STREAMER_LEVELS`**: 5 niveles basados en horas de stream: Bronce (0h), Plata (1min), Oro (5min), Diamante (10min), Maestro (1h).

**Funciones:**

| Función | Descripción |
|---|---|
| **`getLevelInfo(userPoints)`** | Calcula el nivel actual del espectador según sus puntos. Retorna `{ currentLevelName, nextLevelName, pointsToNextLevel, progressPercentage }`. Soporta niveles personalizados del usuario. |
| **`getStreamerLevelInfo(streamerHours)`** | Calcula el nivel del streamer según sus horas acumuladas. Retorna `{ levelName, hoursToNext, progress }`. |

#### `validators.ts`
Funciones de validación:

| Función | Descripción |
|---|---|
| **`passwordMeetsRules(pwd)`** | Valida: mínimo 8 caracteres, una mayúscula, una minúscula, un número. Retorna `{ ok, length, upper, lower, number }`. |
| **`usernameAllowed(u)`** | Valida: 3-20 caracteres, solo letras, números y guion bajo. |
| **`isNameValid(name)`** | Valida: solo letras (incluyendo acentos y Ñ) y espacios. |

#### `mockData.ts`
Datos mock de streamers famosos con nombre, seguidores y foto de perfil desde `i.pravatar.cc`. Usado en `RightSidebar` para mostrar la lista de seguidos.

### Componentes (`src/components/`)

#### `Sidebar.tsx`
Barra lateral izquierda de navegación. Escucha el evento `userChanged` para actualizar el estado del usuario.
- **Enlaces públicos**: Inicio, Explorar, Destacados, Perfil.
- **Enlaces para usuarios logueados**: Crear Stream, Estadísticas, Gestionar Regalos, Comunidad.
- **Footer**: Nosotros, Términos y Condiciones, copyright.
- Usa `NavLink` de React Router para resaltar la ruta activa.

#### `RightSidebar.tsx`
Panel lateral derecho. Tiene dos vistas:
- **Usuario logueado**: Foto de perfil, nombre, saldo de monedas, nivel (clickeable a `/levels`), botones Mensajes/Depositar, Club VIP, lista de streamers seguidos, Centro de ayuda, Cerrar sesión, Toggle de tema.
- **Usuario invitado**: Nombre genérico (`guestXXXX`), botón de iniciar sesión, toggle de tema.

Usa `DepositModal` para recargas y `useTheme` para el toggle.

#### `Chat.tsx`
Chat en vivo para streams. Características:
- **Mensajes simulados**: Cada 5 segundos, un usuario aleatorio (de `RANDOM_USERS_GENERIC`) envía un mensaje aleatorio (de `RANDOM_MESSAGES`). Esto simula la actividad de espectadores reales.
- **Mensajes del usuario**: Si el usuario está logueado, puede escribir y enviar mensajes. Al enviar, se suma 1 punto y se recalcula el nivel. Si sube de nivel, se muestra notificación.
- Auto-scroll hacia abajo cuando hay nuevos mensajes.
- Persiste el usuario logueado vía `userChanged` event.

#### `DepositModal.tsx`
Modal de recarga de monedas. Muestra 4 paquetes predefinidos (100, 550, 1200, 2500 monedas) y opción de compra personalizada (S/0.05 por moneda). Al seleccionar un paquete, abre `PaymentModal`. Al confirmar, llama a `purchaseCoins` y actualiza el usuario.

#### `PaymentModal.tsx`
Modal de selección de método de pago. Soporta PayPal y tarjeta (con formulario de número, vencimiento y CVV). Al confirmar, retorna el método y últimos 4 dígitos de tarjeta.

#### `GiftModal.tsx`
Modal de envío de regalos durante un stream. Muestra una grilla de regalos (4 por defecto + personalizados del usuario). Verifica si el usuario tiene monedas suficientes. Al enviar:
1. Llama a `sendDonation` que deduce monedas y suma puntos.
2. Si hay cambio de nivel, muestra notificación.
3. Dispara alerta visual (`GiftAlert`).
4. Cierra el modal tras 1.5 segundos.

#### `GiftFormModal.tsx`
Formulario para crear o editar regalos personalizados. Campos: nombre, ícono (emoji), costo en monedas, puntos otorgados. Usa `crypto.randomUUID()` para nuevos regalos.

#### `GiftAlert.tsx`
Overlay visual que aparece brevemente cuando alguien recibe un regalo. Muestra el nombre del usuario, el icono y nombre del regalo con animación. Se cierra automáticamente tras unos segundos.

#### `Notification.tsx`
Toast de notificación con barra de progreso que se desvanece en 5 segundos. Usa intervalos para actualizar la barra cada 50ms.

#### `HeaderUser.tsx`
Componente placeholder que retorna `null`. Reservado para futura funcionalidad.

#### `LevelBar.tsx`
Barra de progreso simple que muestra el nivel y porcentaje basado en XP (`currentXP / 10 + 1` para el nivel, `currentXP % 10 * 10` para el progreso). Usado en algunas páginas como indicador rápido.

### Páginas (`src/pages/`)

#### `Home.tsx`
Página principal. Muestra un feed de contenido con:
- **Hero/Banner**: "Bienvenido a Streaming-UL" con botón "Explorar".
- **Grid de streamers**: Tarjetas de streamers populares desde `MOCK_STREAMERS` con foto, nombre, seguidores y botón de seguir/seguido.
- **Secciones por categoría**: Gaming, Música, Deportes, Arte, Educación, Noticias con tarjetas de streamers mock.
- Integración con localStorage para persistir seguidos y likes.

#### `Login.tsx`
Formulario de inicio de sesión con:
- Campo de identificador (email o username).
- Campo de contraseña con toggle de visibilidad.
- Checkbox "Recordar sesión" (determina si usa localStorage o sessionStorage).
- **Bloqueo por intentos fallidos**: 3 intentos fallidos bloquean la cuenta por 30 segundos.
- Enlaces a registro y recuperación de contraseña.

#### `Register.tsx`
Registro en 3 pasos:
1. **Paso 1**: Fecha de nacimiento, método de registro (correo o teléfono), envío de código de verificación simulado.
2. **Paso 2**: Ingreso del código de 6 dígitos.
3. **Paso 3**: Nombre completo, nombre de usuario (con validación en tiempo real y sugerencias), contraseña (con validación de reglas).

#### `ForgotPassword.tsx`
Página simple de recuperación de contraseña con campo de email. Actualmente es funcionalidad placeholder (simulada).

#### `ExplorarPage.tsx`
Página de exploración con:
- Grid de streamers en vivo simulados (cada uno con un nombre, categoría y espectadores aleatorios).
- Banner informativo "Streams en Vivo y Grabaciones".
- Botón por streamer para "Ver Stream".

#### `DestacadosPage.tsx`
Muestra streamers destacados en tarjetas con foto, nombre, seguidores, descripción y enlace para ver stream. Datos mock desde `MOCK_STREAMERS`.

#### `CategoryPage.tsx`
Página dinámica que recibe el nombre de categoría por URL (`/category/:categoryName`). Muestra streams mock filtrados por categoría.

#### `ClipPage.tsx`
Reproductor de clips de video. Muestra un reproductor de video simulado, información del clip (título, vistas, likes, fecha) en el sidebar derecho. Incluye botones de like y seguir al streamer.

#### `ProfilePage.tsx`
Perfil del usuario logueado con:
- Foto, nombre, username, bio (simulada).
- Estadísticas: seguidores, seguidos, streams, likes.
- Grid de contenido reciente con tarjetas de video/clip mock.
- Botones de editar perfil y compartir.

#### `StreamSetupPage.tsx`
Configuración previa a iniciar un stream. Incluye:
- Título y descripción del stream.
- Opciones de chat (todos / solo seguidores).
- Vista previa con placeholder de video y chat.
- Al iniciar: verifica que el usuario exista, crea el stream vía `createStream`, guarda el ID en sessionStorage y redirige a `/stream/live`.

#### `StreamPage.tsx`
Vista pública de un stream (espectador). Muestra:
- Reproductor de video placeholder con el ID del stream.
- Detalles del stream (título, descripción).
- Botones "Volver" y "Enviar Regalo" (abre `GiftModal`).
- Componente `Chat` integrado.

#### `LiveDashboardPage.tsx`
Dashboard del streamer durante una transmisión en vivo. Características:
- **Temporizador**: Muestra el tiempo transcurrido en formato `HH:MM:SS`.
- **Heartbeat**: Cada segundo envía un heartbeat al stream para acumular tiempo.
- **Nivel Streamer**: Muestra el nivel actual y progreso.
- **Regalos**: Botón para abrir `GiftModal` en modo auto-vista (no puede enviarse regalos a sí mismo).
- **Finalizar**: Botón para detener la transmisión, elimina el stream ID y redirige a estadísticas.
- Chat integrado en panel derecho.

#### `GiftManagementPage.tsx`
CRUD completo de regalos personalizados del canal:
- Lista todos los regalos personalizados del usuario.
- Botón "+ Crear Nuevo Regalo" abre `GiftFormModal`.
- Cada regalo tiene botones Editar y Eliminar.
- Al cargar, sincroniza los regalos desde el mock API.
- Persiste cambios en localStorage.

#### `CommunitySettingsPage.tsx`
Configuración de la comunidad del canal:
- Niveles de espectador personalizados con umbrales de puntos editables.
- Cada nivel tiene nombre, puntos requeridos y acciones de editar/eliminar/agregar.
- Persiste los niveles en el usuario en localStorage.

#### `LevelsPage.tsx`
Tabla informativa de todos los niveles del sistema:
- Muestra los 10 niveles de espectador con nombre y puntos requeridos.
- Estilo visual con la barra de nivel y colores por rango.

#### `StatsPage.tsx`
Panel de estadísticas con gráficos usando Chart.js:
- **Gráfico de donaciones**: Historial diario de monedas gastadas en regalos (datos mock).
- **Gráfico de nivel de streamer**: Progresión de horas de stream por día.
- **Gráfico de regalos populares**: Top regalos enviados.
- Usa `react-chartjs-2` para renderizar los gráficos.

#### `Mensajes.tsx`
Página placeholder de mensajes. Contenido pendiente de implementar.

#### `Perfil.tsx`
Página placeholder de configuración de perfil. Contenido pendiente de implementar.

#### `Nosotros.tsx`
Página "Sobre nosotros" que muestra el equipo del proyecto. Renderiza tarjetas con foto, nombre y rol de cada miembro.

**Miembros actuales:**
- Leonardo Sotelo — Desarrollador
- Geraldine Chancafe — Desarrollador
- Matias Oquendo — Desarrollador

#### `TyC.tsx`
Página de Términos y Condiciones con secciones de:
- Aceptación de términos, descripción del servicio, registro, propiedad intelectual, conducta del usuario, limitación de responsabilidad, ley aplicable.

#### `TyC.css`
Estilos para términos y condiciones: contenedor con ancho máximo, tipografía limpia y espaciado para lectura.

---

## Flujo de Datos

### Persistencia
Toda la información de usuarios se almacena en `localStorage` bajo las claves:
- `pw_users` — Array JSON con todos los usuarios registrados.
- `pw_active_user` — Usuario actual con sesión activa (si marcó "Recordar").
- `sessionStorage.getItem('pw_active_user')` — Usuario activo sin "Recordar".
- `pw_block_until` — Timestamp de bloqueo por intentos fallidos.
- `pw_login_attempts` — Contador de intentos fallidos.

### Eventos
El sistema usa eventos personalizados de `window` para sincronizar componentes:
- **`userChanged`**: Se dispara cuando cambia el usuario activo (login, logout, update, follow, compra, donación). Todos los componentes que muestran datos del usuario escuchan este evento.

### Navegación
React Router DOM maneja las rutas. Las rutas `/login`, `/register`, `/forgot-password` se renderizan sin el layout principal. Todas las demás rutas usan `MainLayout` que incluye Sidebar y RightSidebar.

---

## Instalación y Ejecución

```bash
# Instalar dependencias
cd ProyectoTiktokpw/FRONTEND
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Vista previa del build
npm run preview
```

El servidor de desarrollo corre en `http://localhost:5173`.

---

## Licencia

Proyecto académico — Universidad de Lima.

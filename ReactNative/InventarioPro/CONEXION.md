# Ejecutar InventarioPro

## Backend y PostgreSQL

Con PostgreSQL activo, configura `backend-inventario/.env` con tu `DATABASE_URL` (ver `.env.example`). El archivo actual se conserva.

Desde `backend-inventario`:

```sh
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

El backend escucha en el puerto 3001, permite CORS y comprueba la conexión y la tabla Producto antes de iniciar. La configuración de Prisma ahora se llama `prisma.config.ts` y el cliente se genera automáticamente al instalar dependencias.

## Frontend

Desde `frontend-inventario`:

```sh
npm install
npm start
```

En Expo Go con conexión local, la app obtiene el equipo del backend desde el host de Expo. El teléfono y el equipo deben estar en la misma red. En web usa el nombre del equipo que sirve la página; sin host de Expo, Android usa `10.0.2.2` e iOS `localhost`.

Si el backend está en otro equipo, usas un túnel o necesitas otro puerto, crea `frontend-inventario/.env.local` con:

```dotenv
EXPO_PUBLIC_API_URL=http://IP_DEL_EQUIPO:3001
```

Reinicia Expo después de cambiar esta variable. Desde el teléfono abre `http://IP_DEL_EQUIPO:3001/` para comprobar el acceso. Si no responde y el backend sí funciona en el equipo, revisa la red y el acceso al puerto 3001 en el firewall.

Todas las operaciones del frontend usan `/productos`; actualizar y eliminar incluyen el ID real en `/productos/:id`. Los controladores, el modelo y las reglas del CRUD se conservan. El formulario conserva los datos si falla el guardado.

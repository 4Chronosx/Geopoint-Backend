# Geopoint Backend

This repository contains the backend server for the **Geopoint** application. It is an Express/TypeScript API that uses Supabase for authentication and data storage. The API exposes endpoints to
- register, login/out and manage users,
- query nearby geolocation data,
- store and retrieve user search history.

---

## 🧱 Technology Stack

- **Node.js** with **Express** (v5)
- **TypeScript** compile-time safety
- **Supabase** (PostgreSQL + Auth) via `@supabase/supabase-js`
- Middleware: `cookie-parser`, `cors`, `dotenv`
- Development: `tsx`, `typescript`


## 🚀 Getting Started

### Prerequisites
- Node 18+ installed
- A Supabase project (see [supabase.com](https://supabase.com))

### Environment variables
Create a `.env` file in the project root or supply variables via your deployment platform:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NODE_ENV=development          # or "production"
```


### Installation

```bash
npm install
```

### Running the server

- **Development** (with automatic TypeScript transpilation via `tsx`):
  ```bash
  npm run dev
  ```
- **Production**
  ```bash
  npm run build    # compile to `dist/`
  npm start         # run compiled code
  ```

The server listens on port `8000` by default and prints the URL on startup.

---

## 📁 Project Structure

```
src/
  index.ts                 # entry point
  controllers/             # request handlers
    auth.controller.ts
    geo.controller.ts
    db.controller.ts
  services/                # business logic wrappers
    auth.service.ts
    geo.service.ts
    db.service.ts
  routes/                  # route definitions
    auth.routes.ts
    geo.routes.ts
    db.routes.ts
  middleware/              # authentication & type helpers
    middleware.ts
  lib/
    supabase.ts            # Supabase client singleton

supabase/                  # migration/seed for local Supabase
```

---

## 🔌 API Endpoints

All routes are prefixed as described below and require authentication via a cookie except where noted.

### Authentication (`/api`)
| Method | Path         | Description                       | Auth required |
|--------|--------------|-----------------------------------|---------------|
| POST   | `/signup`    | Register a new user               | ❌            |
| POST   | `/login`     | Login and set auth cookie         | ❌            |
| POST   | `/logout`    | Clear auth cookie                 | ✅            |
| GET    | `/currentUser` | Get currently authenticated user | ✅            |


### Geolocation (`/home`)
| Method | Path       | Query params       | Description                        |
|--------|------------|--------------------|------------------------------------|
| GET    | `/user`    | `lat`, `lng`       | Retrieve nearby geodata for user   |
| GET    | `/search`  | `lat`, `lng`, `radius` | Perform a generic location search |

> Both `/home` routes require a valid login cookie.

### Search History (`/search`)
| Method | Path        | Description                          |
|--------|-------------|--------------------------------------|
| POST   | `/add`      | Save a new search to the user's history |
| DELETE | `/delete`   | Remove all history for the user      |
| GET    | `/get-all`  | Retrieve all saved searches          |
| GET    | `/info`     | Get details of the most recent search |

All history routes also require authentication.

---

## 🛠 Development Notes

- Authentication is implemented with Supabase JWTs stored in a secure, `httpOnly` cookie. The middleware `authenticate` verifies tokens and populates `req.user`.
- Controllers delegate business logic to `services` which call Supabase APIs.
- CORS is restricted to known origins including localhost ports and the frontend URL.

Supabase migrations and seeds can be found under the `supabase/` directory; run them with the Supabase CLI when provisioning your local environment.

---

## ✅ Deployment

- Build the project (`npm run build`) and deploy `dist/` along with the `package.json` and `node_modules`.
- Ensure environment variables are configured in the hosting environment.
- Expose port `8000` or configure a different PORT via environment variable if required.

---

## 📄 License

This project is licensed under ISC (see `package.json`).

---

Feel free to explore the code and adapt the backend for your own geolocation-driven app! 💡
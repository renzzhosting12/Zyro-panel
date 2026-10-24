# Production architecture checklist

## Components
1. Next.js UI (Vercel)
2. API service (server-side; authenticated)
3. PostgreSQL
4. Redis (sessions, queue, pub/sub)
5. WebSocket gateway for chat and terminal streams
6. Linux node with Docker and a server agent (Wings or a deliberately designed equivalent)

## Security gates before public launch
- Password hashing with Argon2id or bcrypt; verified email and reset flow.
- Session cookies: HttpOnly, Secure, SameSite; CSRF protection where applicable.
- Admin role enforced server-side on every privileged route.
- Never expose daemon tokens in browser code.
- Per-user server ownership and permission checks.
- Validate startup commands and uploads; use isolated Docker containers and CPU/RAM/disk/port quotas.
- Rate limit login, chat, music search, and API requests.
- Audit all admin actions; encrypted backups and recovery plan.
- HTTPS for panel and node endpoints.
- No server controls until a real node is registered and health-checked.

## Server state lifecycle
UI -> authenticated API -> node agent -> Docker container.
The UI must display actual state from the API/agent, never assume a button click succeeded.

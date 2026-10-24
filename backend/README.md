# Backend placeholder

This folder documents the production API boundary. It intentionally contains no fake daemon credentials or unsafe direct Docker endpoint.

Suggested REST routes:
- `POST /auth/login`, `POST /auth/logout`
- `GET /me`
- `GET /servers`, `POST /servers`
- `POST /servers/:id/start|stop|restart`
- `GET /servers/:id/console` (WebSocket upgrade)
- `GET /nodes`, `POST /nodes`
- `GET /servers/:id/files`, upload/download/delete with ownership checks
- `GET /chat/messages`, WebSocket chat gateway
- `GET /admin/users`, `GET /admin/audit-logs` (admin role only)

Implement these on a server you control and authenticate every request. Until this is implemented, the frontend deliberately labels controls as preview-only.

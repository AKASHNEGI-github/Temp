### What is the difference between session-based authentication and token-based authentication?

**Session-based authentication:**
- It is a stateful authentication mechanism.
- After successful login, the server creates a session and stores session information on the server.
- The server sends a unique Session ID to the client, usually through a cookie.
- For every subsequent request, the client sends the Session ID.
- The server validates the Session ID by checking its session store.

**Token-based authentication:**
- It can be a stateless authentication mechanism.
- After successful login, the server generates an authentication token, such as a JWT.
- The client stores the token.
- For every subsequent request, the client sends the token, usually in the Authorization header.
- The server validates the token's signature and expiration.

| Comparison | Session-based | Token-based |
|------------|---------------|-------------|
| Authentication type | Stateful | Usually stateless |
| Where data is stored | Server | Token is held by client |
| What client sends | Session ID | Authentication token |
| Server validation | Session store lookup | Token validation |
| Scalability | Requires shared session storage in distributed environments | Easier to scale without shared session storage |
| Logout | Destroy the session | Revoke token or wait for expiry |
| Server memory | Session information needs storage | No per-user session storage required for self-contained tokens |
| Common technology | Cookies + sessions | JWT, OAuth 2.0 access tokens |

**Real-world example:** Imagine you are logging into an e-commerce application.

**Session-based authentication:**
- You log in with your username and password.
- The server validates your credentials.
- The server creates a session with ID SESSION123.
- The browser stores the session ID in a cookie.
- When you visit your profile, the browser sends SESSION123.
- The server checks its session database and identifies you.

**Token-based authentication:**
- You log in with your username and password.
- The server validates your credentials.
- The server generates a JWT access token.
- The client stores the token.
- When you visit your profile, the client sends the JWT.
- The server validates the JWT signature and expiration to identify you.




# SECURITY-TASKS — SecureLab

A frontend-only Computer Security coursework toolkit. The root page is the single workspace and keeps navigation visible while each task loads into its task frame.

## Run it

Open `index.html` in a browser, or enable GitHub Pages for this repository and serve the root folder. Web Crypto functions (SHA family, PBKDF2, secure random bytes, and HMAC) require a secure context such as HTTPS or localhost.

## File structure

The shared workspace uses:
- `index.html` — single-page shell and task navigation
- `style.css` — workspace layout, theme, responsiveness
- `app.js` — task navigation and shared in-memory stores

Every task has its own three files:

| Task | HTML | CSS | JavaScript |
| --- | --- | --- | --- |
| 1 — Caesar Cipher | `task-1.html` | `task-1.css` | `task-1.js` |
| 2 — Caesar Brute Force | `task-2.html` | `task-2.css` | `task-2.js` |
| 3 — Hash Generator | `task-3.html` | `task-3.css` | `task-3.js` |
| 4 — One-Time Pad | `task-4.html` | `task-4.css` | `task-4.js` |
| 5 — Password Vault | `task-5.html` | `task-5.css` | `task-5.js` |
| 6 — Message MAC | `task-6.html` | `task-6.css` | `task-6.js` |

## Task summary

1. **Caesar Cipher:** encrypt/decrypt with a selected shift.
2. **Brute Force:** try all 25 Caesar shifts.
3. **Hash Generator:** deterministic MD5, SHA-1, SHA-256, SHA-384, and SHA-512 digests with output length metadata.
4. **One-Time Pad:** generates a cryptographically random pad matching the UTF-8 plaintext byte length, XORs the message, and decrypts by key ID.
5. **Password Vault:** registration and login verification using a unique salt and PBKDF2-HMAC-SHA-256 password hash; plaintext passwords are not stored.
6. **Message MAC:** HMAC-SHA-256/SHA-512 preview before sending to an in-page outbox, with tag verification.

## Storage behavior

No backend, network submission, or database is used. The root page creates a shared `window.SecurityStore` object for OTP keys, demo user records, and the outbox. Task iframes read that object so values remain available while switching between labs; all values are cleared when the root page is refreshed or closed. OTP keys and message secrets are not sent to a server.

## Security caveats

This project is for learning and demonstration, not production authentication or messaging. MD5 and SHA-1 are included for the assignment but are not suitable for modern security use. The password demo uses browser-side PBKDF2 to demonstrate hashing and verification, but production applications should use well-reviewed server-side authentication and password-storage configuration. One-Time Pad security also depends on a truly random key that is never reused and is kept secret.

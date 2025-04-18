# 🏴‍☠️ 🎮Pirate Adventure Game

A fun, browser-based 2D pirate shooting game developed as part of a **Web Development Year 1** project. The game features character movement, enemy generation, shooting mechanics, and score tracking. It also includes user authentication, persistent session handling, and a leaderboard using **Flask**, **SQLite**, and **server-side sessions**.

## Front-End Game
- HTML5 Canvas-based 2D game
- Playable pirate character with sprite animation
- Move in four directions using arrow keys
- Fire bullets with mouse click
- Enemies spawn and move randomly
- Collision detection for player and enemies
- Score system:
  - Gain points for hitting enemies
  - Lose points when hit by enemies
  - Win at 1000 points, lose at 0
- Background music and sound effects

### Game Logic (JavaScript)
- Frame-based animation using `requestAnimationFrame`
- Dynamic bullet and enemy logic
- Keyboard/mouse interaction handling
- Client-side rendering using `canvas.getContext("2d")`
- Sends final score to the backend using `XMLHttpRequest`

### Backend (Python + Flask)
- Flask-powered server with multiple routes:
  - `/game` - Game interface
  - `/register`, `/login`, `/logout` - User authentication
  - `/leaderboard` - View top scores
- Uses Flask sessions to track logged-in users
- Implements custom `@login_required` decorator for protected routes
- Secure password handling with `werkzeug.security`
- Game score stored in a **SQLite database** via the `/store_score` route

---

## Tech Stack
| Technology     | Role                     |
|----------------|--------------------------|
| HTML5 Canvas   | Game visuals & layout    |
| JavaScript     | Game logic & interactions|
| Flask          | Web framework (Python)   |
| SQLite         | Persistent data storage  |
| Flask-Session  | Server-side session mgmt |
| Jinja2         | Template rendering       |
| CSS            | Basic page styling       |


## Leaderboard
- Score is submitted when a player finishes the game (win or lose).
- The leaderboard is rendered dynamically using Jinja and data from the SQLite database.

## Credits
Created by Peace Samuel.
Part of Year 1 Computer Science Web Development Assignment.


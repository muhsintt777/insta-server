# Insta-Server

Modern TypeScript Express backend for an Instagram‑style social platform. Provides authentication, posts, comments, likes, friendships, file upload (S3 compatible), validation via Zod, consistent API responses, and robust error handling.

## ✨ Features

- User authentication (access + refresh tokens, httpOnly cookies)
- User management
- Posts CRUD with pagination (aggregate paginate)
- Comments & Likes
- Friend / follow requests & relationships
- Secure password hashing (bcrypt)
- File upload (multer -> temp folder -> S3 bucket integration placeholder)
- Centralized error + validation handling (Zod + custom errors)
- Consistent JSON response wrapper (`ApiResponse`)
- Environment driven configuration
- Testable architecture (Jest + mongodb-memory-server)

## 🧱 Tech Stack

| Layer       | Tech                                   |
| ----------- | -------------------------------------- |
| Runtime     | Node.js 22                             |
| Language    | TypeScript (strict)                    |
| Framework   | Express 4                              |
| Database    | MongoDB + Mongoose 8                   |
| Auth        | JWT (access + refresh)                 |
| Validation  | Zod                                    |
| File Upload | Multer + AWS S3 SDK                    |
| Testing     | Jest, Supertest, mongodb-memory-server |
| Tooling     | ts-node-dev, tsc-alias, Prettier       |

## 📂 Project Structure

```
src/
	apis/
		auth/            # Auth routes, controller, service, validation
		users/           # User domain
		posts/           # Post domain
		comments/        # Comment domain
		likes/           # Like domain
		friends/         # Friend relationships
	configs/           # env, db, cors, storage bucket
	core/              # app bootstrap, router, server, error + meta handlers
	middlewares/       # auth + file upload middlewares
	utils/             # helpers (tokens, crypto, responses, errors, common)
public/temp/         # transient upload storage
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- Yarn (preferred)
- MongoDB instance OR connection string (Atlas / local)

### Install

```
yarn install
```

### Run (Dev)

```
yarn dev
```

### Build & Start (Prod)

```
yarn build
yarn start
```

### Tests

```
yarn test
```

## 🧪 Testing

- Uses `mongodb-memory-server` for isolated integration-style tests.
- Place test files in `__test__` folders alongside source.
- Example domains already include tests under `utils` and `auth`. |

## 📑 Standard Response Shape

```
{
	"message": string,
	"errorType": string | null,
	"data": any
}
```

Always returned via `new ApiResponse(data, message, errorType)`.

## 🔐 Security Notes

- JWT secrets never committed; keep strong & rotated.
- httpOnly, secure cookies (enable `secure` in PROD with HTTPS termination).
- Input validation on all mutation endpoints.
- Passwords hashed with bcrypt (`bcrypt.hash` typically with salt rounds ~10-12; verify in service layer).
- Avoid logging sensitive tokens (current morgan format is safe for bodies but review if expanded).

## 🛠 Scripts

| Script          | Purpose                                       |
| --------------- | --------------------------------------------- |
| yarn dev        | Start dev server with hot reload              |
| yarn build      | Compile TypeScript + fix paths with tsc-alias |
| yarn start      | Run compiled JS                               |
| yarn test       | Execute test suite                            |
| yarn test:watch | Watch mode tests                              |
| yarn format     | Prettier formatting                           |

## 🧬 Architecture Overview

- Routing: `core/router.ts` mounts domain routers under `/api/*`.
- Middlewares: auth, file uploads, error handling, 404, health & metadata endpoints.
- Config: environment, DB, CORS, storage bucket abstraction.
- Separation of Concerns: controllers -> services -> models.
- Utils: reusable helpers for tokens, crypto, responses, validation.

## 🩺 Health & Metadata

- `/health` basic readiness endpoint.
- `/metadata` exposes app meta (see `meta-data.ts`).

## 🤝 Contributing

1. Fork & branch from `dev`.
2. Add/Update tests for changes.
3. Run formatter & ensure tests pass.
4. Use conventional commit style: `feat: ...`, `fix: ...`, `chore: ...`.

## VS Code Extensions (Recommended)

- Prettier - Code formatter

## Troubleshooting

| Issue                | Check                                           |
| -------------------- | ----------------------------------------------- |
| Cannot connect to DB | Verify `MONGO_URI` & network access             |
| 401 Unauthorized     | Missing/expired access token cookie/header      |
| 422 Validation Error | Zod schema mismatch; review request body        |
| 500 Unknown Error    | See server logs; add more granular CustomErrors |

## Maintainer

Open to enhancements & PRs.

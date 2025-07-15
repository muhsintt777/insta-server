---
applyTo: '**'
---

# GitHub Copilot Custom Instructions

## Coding Standards

- Use TypeScript strict mode and idiomatic TypeScript patterns
- Avoid deprecated APIs
- Structure code for scalability, maintainability, and performance
- Write descriptive commit very short, use chore: feat: fix: for prefix.
- Apply secure coding practices and web security best practices

## Preferences

- Modern, concise, and industry best practices
- Clear, maintainable, and scalable code
- Professional and clear documentation

---

## Project Architecture & Conventions

- **Monorepo Structure:** All source code is under `src/`, organized by domain (`apis/`, `core/`, `configs/`, `middlewares/`, `utils/`).
- **API Routing:** Main entry is `src/core/app.ts`, which wires up routers from `src/core/router.ts`. Each domain (e.g., `auth`, `posts`, `users`) has its own controller, service, routes, and validation.
- **Environment Config:** Use `src/configs/env.ts` for all environment variables. Mock these in tests via `jest.setup.js`.
- **Error Handling:** Centralized in `src/core/error-handler.ts` using custom `CustomError` and Zod validation errors.
- **Response Pattern:** Use `ApiResponse` from `src/utils/api-response.ts` for all API responses.
- **Testing:** All tests are colocated in `__test__` folders. Use Jest with TypeScript (`ts-jest`). Path aliases (`utils/*`, `configs/*`) are mapped in `jest.config.json`.
- **Database:** MongoDB via Mongoose. Connection logic in `src/configs/db.ts`.
- **Build & Run:** Use Yarn scripts:
  - `yarn dev` for development (hot reload, TypeScript)
  - `yarn build` for production build
  - `yarn start` for running built code
  - `yarn test` for running tests
- **TypeScript Paths:** Use aliases as defined in `tsconfig.json` (`@utils/*`, `@configs/*`, etc.). Prefer these for imports.
- **Validation:** Use Zod for request validation. Error messages are extracted via `getZodErrMessage` in `utils/common.ts`.
- **File Uploads:** Temporary files stored in `public/temp`, created at server start (`core/server.ts`).
- **Security:** Cookies are set with `secure`, `httpOnly`, and `sameSite` flags. JWT is used for authentication.

## Examples

- **API Route Example:**  
  `src/core/router.ts`
  ```typescript
  router.use('/auth', authRouter);
  router.use('/posts', postsRouter);
  ```

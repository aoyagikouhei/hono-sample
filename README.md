# hono-sample

## pnpm
```sh
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

## backend
```sh
mkdir apps
cd apps
pnpm create hono@latest ./backend --template nodejs --pm pnpm --install
pnpm i -D vite @hono/vite-dev-server vitest zod drizzle-kit @electric-sql/pglite
pnpm i @hono/swagger-ui @hono/zod-openapi drizzle-orm

npm run dev
```
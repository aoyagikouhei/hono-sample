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
pnpm i -D vite @hono/vite-dev-server

npm run dev
```

FROM node:16-alpine as base
RUN npm i -g pnpm


FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS allins
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
EXPOSE 3000
RUN npx prisma generate
RUN pnpm build
RUN pnpm prune --prod
CMD ["node", "dist/main.js"]
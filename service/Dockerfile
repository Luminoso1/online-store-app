FROM node:22-slim

RUN npm install -g pnpm
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY prisma ./prisma/

RUN pnpm run build

COPY . .

ENV PORT=8080
EXPOSE 8080

CMD ["pnpm", "start"]

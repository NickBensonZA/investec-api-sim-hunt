FROM node:lts-slim AS base
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --omit=dev

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]

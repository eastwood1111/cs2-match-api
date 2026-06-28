FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY src ./src

ENV NODE_ENV=production
ENV PORT=80

EXPOSE 80

CMD ["node", "src/index.js"]

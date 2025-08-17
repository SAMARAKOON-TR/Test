FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev || npm install
COPY . .
VOLUME ["/app/session"]
CMD ["npm", "start"]

FROM node:22-alpine AS builder

WORKDIR /app
COPY ./ /app
RUN npm install
COPY . .
RUN npm run build

EXPOSE 2000

CMD ["sh", "-c", "npm run migration:run && npm run start:prod"]
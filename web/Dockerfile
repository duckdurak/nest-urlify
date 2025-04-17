FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.25-alpine

RUN rm -rf /etc/nginx/conf.d/*
RUN mkdir -p /etc/nginx/ssl
COPY nginx.key /etc/nginx/ssl/nginx.key
COPY nginx.crt /etc/nginx/ssl/nginx.crt
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
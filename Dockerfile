# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY index.html .
COPY vite.config.js .
COPY public/ public/
COPY src/ src/
RUN npm ci
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
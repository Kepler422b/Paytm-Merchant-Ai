FROM node:20-alpine as build

WORKDIR /app

# Copy package configurations
COPY package.json package-lock.json* ./
COPY client/package.json ./client/
COPY shared/package.json ./shared/

# Install dependencies
RUN npm install

# Copy source
COPY shared/ ./shared/
COPY client/ ./client/

# Build shared, then client
RUN npm run build -w shared
WORKDIR /app/client
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

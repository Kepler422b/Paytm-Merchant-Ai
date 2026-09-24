FROM node:20-alpine

WORKDIR /app

# Copy root package.json and workspace configurations
COPY package.json package-lock.json* ./
COPY server/package.json ./server/
COPY shared/package.json ./shared/

# Install dependencies
RUN npm install

# Copy source code
COPY shared/ ./shared/
COPY server/ ./server/

# Build shared first, then server
RUN npm run build -w shared
WORKDIR /app/server
RUN npx prisma generate
RUN npm run build

# Expose port
EXPOSE 3001

CMD ["npm", "run", "start"]

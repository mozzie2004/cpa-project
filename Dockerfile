# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files first for layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
ARG VITE_BASE_URL
ARG VITE_API_KEY
RUN npm run build

# --- Production stage ---
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

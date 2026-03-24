# Stage 1: Build Angular application
FROM node:12 AS build
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Check if package-lock.json exists, if so use ci, else install
RUN npm install

# Copy source code
COPY . .

# Build the app (production mode)
RUN npm run build -- --prod

# Stage 2: Serve application using Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts to nginx public directory
# The output path might depend on angular.json `outputPath` parameter
# Typically it's dist/<project-name>. We'll use dist/frontend or dist
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build the app
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json or yarn.lock if you're using Yarn
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Stage 2: Run the app
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variable to use production mode
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]

# Use Node.js official image as base
FROM node:21

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy Next.js app files
COPY . .

# Build Next.js app
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start Next.js app
ENTRYPOINT ["npm", "run", "start"]

# First stage: Installation and building
FROM --platform=linux/amd64 node:20.10.0 AS builder

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json postinstall.cjs ./

RUN npm install -g npm@latest

#Clear node_modules and package-lock.json to ensure fresh installation
RUN rm -rf node_modules package-lock.json


# Clear npm cache and install dependencies without optional dependencies
RUN npm cache clean --force && npm install --omit=optional

COPY . .

# Second stage: Set up the production environment
FROM --platform=linux/amd64 node:20.10.0

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app .

# Expose the port your app runs on
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0

# Command to run your application
CMD ["npm", "run", "dev"]

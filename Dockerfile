# Use an official Node.js runtime as a parent image
FROM node:latest

# Install Nginx
RUN apt-get update 

# Set the working directory
WORKDIR /app

# Remove the node_modules folder
RUN rm -rf node_modules

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

#FROM nginx:alpine
#COPY --from=build /app/dist /usr/share/nginx/html

# Expose the application port
EXPOSE 3000

# Start Nginx and the Node.js application
CMD ["npm", "start"]

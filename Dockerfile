# Dockerfile

# Build stage
FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm install

# Production stage
FROM nginx 
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf 

# Copy the .env file to the container
COPY .env .

# Build the React app
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Dockerfile

# Build stage
FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm install

# Set environment variable for React app build
ARG REACT_APP_API
RUN REACT_APP_API=$REACT_APP_API npm run build

# Production stage
FROM nginx 
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder usr/src/app/build  /usr/share/nginx/html 

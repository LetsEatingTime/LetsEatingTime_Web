# Dockerfile

# Build stage
FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./ ./
ARG REACT_APP_API
ENV REACT_APP_API=$REACT_APP_API
RUN npm run build

# Production stage
FROM nginx 
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder usr/src/app/build  /usr/share/nginx/html 

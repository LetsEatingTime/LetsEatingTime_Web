# Dockerfile

<<<<<<< HEAD
# Build stage
FROM node:alpine as builder
=======
FROM node:alpine as builder
ARG REACT_APP_API
ENV REACT_APP_API=$REACT_APP_API
>>>>>>> main
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./ ./
<<<<<<< HEAD
ARG REACT_APP_API
ENV REACT_APP_API=$REACT_APP_API
RUN npm run build

# Production stage
FROM nginx 
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder usr/src/app/build  /usr/share/nginx/html 
=======
RUN npm run build

FROM nginx 
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder usr/src/app/build  /usr/share/nginx/html 
>>>>>>> main

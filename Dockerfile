FROM node:latest
EXPOSE 5000
COPY server.js .
CMD node server.js
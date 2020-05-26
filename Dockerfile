FROM node:12.16.3-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY ./backend/package*.json ./
USER node
RUN npm install
COPY ./backend/ .
CMD ["node", "index.js"]

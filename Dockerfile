FROM node:12.16.3-alpine
USER node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node ./backend/package*.json ./
RUN npm install
COPY --chown=node:node ./backend/ .
CMD ["node", "index.js"]

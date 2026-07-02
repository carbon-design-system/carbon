FROM node:slim

WORKDIR /usr/src/action
COPY . .
RUN npm install --omit=dev
ENTRYPOINT ["node", "/usr/src/action/src/index.js"]


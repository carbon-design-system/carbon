FROM node:slim

WORKDIR /usr/src/action
COPY . .
RUN yarn install --production
ENTRYPOINT ["node", "/usr/src/action/src/run.js"]

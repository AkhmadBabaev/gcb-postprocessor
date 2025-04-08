FROM node:22-bookworm
ARG PORT=3432
ARG AUTH_TOKEN=""
RUN mkdir -p /var/app/node_modules && chown -R node:node /var/app
WORKDIR /var/app
COPY --chown=node:node . .
USER node
RUN npm install
EXPOSE 3432
CMD [ "npm", "run", "start:prod" ]

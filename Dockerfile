FROM node:22-bookworm
ENV PORT=3432
ENV AUTH_TOKEN=""

ARG POST_PROCESSOR_METHOD_FILE=./post-processor-real.method.ts
ARG POST_PROCESSOR_METHOD_FILE_DESTINATION=/var/app/src/post-processor/post-processor-real.method.ts
ARG POST_PROCESSOR_METHOD_FILE_SOURCE=./post-processor.method2.ts

RUN mkdir -p /var/app/node_modules && chown -R node:node /var/app
WORKDIR /var/app
COPY --chown=node:node . .
#COPY --chown=node:node $POST_PROCESSOR_METHOD_FILE_SOURCE $POST_PROCESSOR_METHOD_FILE_DESTINATION
#COPY --chown=node:node ppm_source ppm_dest
USER node
RUN npm install
RUN ./node_modules/.bin/tsc ${POST_PROCESSOR_METHOD_FILE_DESTINATION}
RUN npm run build
EXPOSE 3432
CMD [ "npm", "run", "start:prod" ]

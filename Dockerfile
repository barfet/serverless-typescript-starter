FROM risingstack/alpine:3.4-v6.11.2-4.6.0

ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV NODE_ENV dev

RUN npm install -g yarn@1.3.2

WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "-c"]

CMD ["yarn install && WEBPACK_CONFIG_TYPE=local AWS_XRAY_CONTEXT_MISSING=LOG_ERROR yarn run start"]
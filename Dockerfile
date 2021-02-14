FROM node:lts-alpine as node-builder
WORKDIR /build
COPY . .
RUN yarn install
RUN yarn run build

FROM node:lts-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=node-builder /build/dist /app/dist
COPY package.json yarn.lock .
RUN yarn install
ENTRYPOINT [ "node" ]
CMD [ "dist/index.js" ]

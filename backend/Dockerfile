FROM node:18-alpine3.15

# can be overriden by docker-compose
# ENV DB_USER=postgres
# ENV DB_HOST=localhost
# ENV DB_PASS=postgres
# ENV DB_PORT=5432

# used in dev environment
RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
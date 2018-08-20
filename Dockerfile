FROM node:8.11.4

WORKDIR /usr/src/test-docker

COPY package*.json ./

RUN npm install
# RUN node_modules/.bin/sequelize db:migrate

COPY . .

RUN chmod +x ./wait-for.sh

EXPOSE 3000

CMD ["npm", "run", "dev"]

# CMD ["npm", "run", "dev"]
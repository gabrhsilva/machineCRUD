FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

RUN adduser -D app
USER app

CMD ["npm", "start"]




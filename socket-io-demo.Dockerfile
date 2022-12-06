FROM  node:14.1.0-alpine

COPY . .

WORKDIR ./dist

RUN "pwd"
RUN ls -l

RUN npm install --verbose

CMD [ "npm", "start" ]

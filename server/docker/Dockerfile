FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]

# Build/Run Commands
# docker build -t code-test .
# docker run -p 8888:8080 code-test

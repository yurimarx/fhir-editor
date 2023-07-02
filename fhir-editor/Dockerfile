# step 1 - application build
FROM node as node
WORKDIR /app
COPY package.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build

# step 2 - publish the app
FROM nginx
COPY --from=node /app/dist/sakai-ng /usr/share/nginx/fhir-editor
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
FROM node 
ADD /dist /dist
RUN node /dist/himalayan-salt.js
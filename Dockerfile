FROM node 
ADD /dist /dist
COPY ./entrypoint.sh /
RUN chmod 755 /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
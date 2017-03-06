FROM node:6.9.1

# Set up NGINX prerequisites; essentially copied from official Dockerfile and
# optimised for better layering and configurability of NGINX version.
RUN apt-key adv --keyserver hkp://pgp.mit.edu:80 \
    --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62 && \
    echo "deb http://nginx.org/packages/mainline/debian/ jessie nginx" >> \
    /etc/apt/sources.list
CMD ["nginx", "-g", "daemon off;"]
VOLUME ["/var/cache/nginx"]
EXPOSE 80

# Install Gulp and Bower first to prevent unnecessary layer cache invalidation;
# NGINX will need frequent security updates, these won't.
RUN npm install --global gulp-cli@1.2.2 bower@1.7.9

ENV NGINX_VERSION 1.11.10-1~jessie
RUN apt-get update && \
    apt-get install --no-install-recommends --no-install-suggests -y \
      ca-certificates \
      nginx=${NGINX_VERSION} \
      nginx-module-xslt \
      nginx-module-geoip \
      nginx-module-image-filter \
      nginx-module-perl \
      nginx-module-njs \
      gettext-base && \
    rm -rf /var/lib/apt/lists/* && \
    ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

# Now that NGINX is installed, install our global dependencies followed by
# building our actual app; ideal ordering for Docker layer caching.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json bower.json .bowerrc ./
RUN npm install && \
    bower --allow-root install

COPY . /usr/src/app
RUN gulp build && \
    mv dist /usr/share/nginx/www && \
    chmod -R 777 /usr/share/nginx/www && \
    mv nginx.conf /etc/nginx/nginx.conf && \
    npm cache clean && bower --allow-root cache clean && \
    rm -Rf *

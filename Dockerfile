# pull a nginx image
FROM nginx:alpine

ARG UID=101

RUN apk update \
    && apk upgrade \
    && apk add bash \
    && apk add jq \
    && rm -rf /var/cache/apk/*

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*

# Copy assets over so Nginx can properly serve 
COPY /style.css .
COPY /script.js .
COPY /index.html .


RUN chown -R nginx:nginx /usr/share/nginx/html
# implement changes required to run NGINX as an unprivileged user
RUN sed -i 's,listen       80;,listen       8080;,' /etc/nginx/conf.d/default.conf \
    && sed -i '/user  nginx;/d' /etc/nginx/nginx.conf \
    && sed -i 's,/var/run/nginx.pid,/tmp/nginx.pid,' /etc/nginx/nginx.conf \
    && sed -i "/^http {/a \    proxy_temp_path /tmp/proxy_temp;\n    client_body_temp_path /tmp/client_temp;\n    fastcgi_temp_path /tmp/fastcgi_temp;\n    uwsgi_temp_path /tmp/uwsgi_temp;\n    scgi_temp_path /tmp/scgi_temp;\n" /etc/nginx/nginx.conf \
    # nginx user must own the cache and etc directory to write cache and tweak the nginx config
    && chown -R $UID:0 /var/cache/nginx \
    && chmod -R g+w /var/cache/nginx \
    && chown -R $UID:0 /etc/nginx \
    && chmod -R g+w /etc/nginx


EXPOSE 8080

USER nginx

# Containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
FROM nginx:alpine
COPY public/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-redirects.conf /etc/nginx/nginx-redirects.conf
EXPOSE 80

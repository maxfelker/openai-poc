#!/bin/sh

filename=$(ls /usr/share/nginx/html/index.html)
sed -i "s|--API_BASE_URL--|${API_BASE_URL}|g" ${filename}
sed -i "s|--GTAG--|${GTAG}|g" ${filename}
exec nginx -g 'daemon off;'

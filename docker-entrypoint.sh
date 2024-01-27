#!/bin/sh

filename=$(ls /usr/share/nginx/html/index.html)
sed -i "s|--AZURE_CONFIG_URL--|${AZURE_CONFIG_URL}|g" ${filename}
exec nginx -g 'daemon off;'

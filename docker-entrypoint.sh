#!/bin/sh
set -e

# Set default port if not provided
PORT=${PORT:-80}

echo "Starting nginx on port $PORT..."

# Replace PORT_PLACEHOLDER with actual PORT in nginx config
sed "s/PORT_PLACEHOLDER/$PORT/g" /etc/nginx/templates/default.conf.template > /etc/nginx/nginx.conf

# Start nginx
exec nginx -g 'daemon off;'

#!/bin/sh
set -e

# Use PORT from environment, default to 80
export PORT=${PORT:-80}

echo "Configuring nginx to listen on port $PORT..."

# Create nginx config with the correct port
cat > /etc/nginx/conf.d/default.conf << EOF
server {
    listen $PORT;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

echo "Starting nginx..."
exec nginx -g 'daemon off;'

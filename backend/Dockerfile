FROM php:7.4-apache

# Install PDO MySQL extension
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Enable Apache mod_rewrite and mod_headers
RUN a2enmod rewrite headers

# Update the default Apache site configuration to point to /var/www/html
# (Optional, as the default is already /var/www/html)
# Copy the backend files (assuming they are mounted or copied into the container)
# In this setup, we will use a volume mount for development, but for production we could copy:
COPY backend/ /var/www/html/SwissTech/backend/
COPY Images/ /var/www/html/SwissTech/Images/

# Fix permissions
RUN chown -R www-data:www-data /var/www/html/SwissTech

EXPOSE 80

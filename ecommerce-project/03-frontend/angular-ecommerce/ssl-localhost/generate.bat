openssl req -x509 -out localhost.crt -keyout localhost.key -newkey rsa:2048 -nodes -sha256 -days 365 -config localhost.conf

openssl x509 -noout -text -in localhost.crt

pause
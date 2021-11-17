keytool -genkeypair -alias luv2code -keystore luv2code-keystore.p12 -storeType PKCS12 -keyalg RSA -keysize 2048 -validity 365 -dname "C=US, ST=Pennsylvania, L=Philadelphia, O=luv2code, OU=Training Backend, CN=localhost" -ext "SAN=dns:localhost"

keytool -list -v -alias luv2code -keystore luv2code-keystore.p12

pause

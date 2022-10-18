#!/bin/sh
# This script is intended to be launched from within a Docker container

echo "..."
cat LICENSE
echo "..."

# Generate the first JavaScript constant for user-env.js, using env variables.
/bin/echo -n "export const USER_DEFINED_HTTP_SERVER_ROOT = '" > user-env.js
if [ $ITTYURLI_HTTP_SERVER_PORTNO -eq 80 ]
then
    /bin/echo -n $ITTYURLI_HTTP_SERVER_PREFIX >> user-env.js
else
    /bin/echo -n $ITTYURLI_HTTP_SERVER_PREFIX >> user-env.js
    /bin/echo -n ":" >> user-env.js
    /bin/echo -n $ITTYURLI_HTTP_SERVER_PORTNO >> user-env.js
fi
/bin/echo "/';" >> user-env.js 

# Generate the second JavaScript constant for user-env.js, using env variables.
/bin/echo -n "export const USER_DEFINED_MIDDLEWARE_SERVER_ROOT = '" >> user-env.js
/bin/echo -n $ITTYURLI_HTTP_SERVER_PREFIX >> user-env.js
/bin/echo ":8081/';" >> user-env.js

redis-server &
gulp serve &
npm start

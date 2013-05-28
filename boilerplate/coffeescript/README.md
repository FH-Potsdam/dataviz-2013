# coffeescript template

Compile the coffeescript by running:

    coffee --bare -c app.coffee

A more powerful option chain looks like this:

    coffee --bare --watch --lint -c app.coffee


A small usage description:

    -c, --compile   compile to JavaScript and save as .js files
    -b, --bare      compile without a top-level function wrapper
    -w, --watch     watch scripts for changes and rerun commands
    -l, --lint      pipe the compiled JavaScript through JavaScript Lint

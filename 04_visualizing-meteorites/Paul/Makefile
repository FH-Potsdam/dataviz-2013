SRC=src/header.coffee \
src/constants.coffee \
src/classification.coffee \
src/classificationItem.coffee \
src/intro.coffee \
src/viz.coffee \
src/index.coffee

OUTPUT=assets/viz.js


.PHONY: build buildwatch

build:
	@echo "Compile CoffeeScript..."
	@coffee -cj ${OUTPUT} ${SRC}

buildwatch:
	@echo "Compile CoffeeScript and watch files for changes..."
	@coffee --watch --bare --lint -cj ${OUTPUT} ${SRC}

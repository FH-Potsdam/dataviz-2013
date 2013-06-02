SRC=src/header.coffee \
src/constants.coffee \
src/classification.coffee \
src/overview.coffee \
src/detail.coffee \
src/intro.coffee \
src/index.coffee

OUTPUT=assets/viz.js


.PHONY: build less coffeewatch

build:
	@echo "Compile CoffeeScript..."
	@coffee -cj ${OUTPUT} ${SRC}
	@echo "Compile Less..."
	@recess --compile style/main.less > assets/style.css

less:
	@echo "Compile Less..."
	@recess --compile style/main.less > assets/style.css

coffeewatch:
	@echo "Compile CoffeeScript and watch files for changes..."
	@coffee --watch --bare --lint -cj ${OUTPUT} ${SRC}
	@recess --compile style/*.less --watch > assets/style.css

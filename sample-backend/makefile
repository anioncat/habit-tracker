# Makefile
BINARY=backend

.PHONY: all build zip clean

all: build

build: 
	go build -o ./dist/${BINARY}

zip: build clean
	mkdir -p ../release
	tar -czf ../release/${BINARY}.tar.gz ./dist/${BINARY}

clean:
	rm -f ../release/${BINARY}.tar.gz
#!/bin/sh

FRONTEND_DIR=frontend
BACKEND_DIR=sample-backend

cd $FRONTEND_DIR
echo entered $PWD
echo
bun run build
echo
cd ../$BACKEND_DIR
echo entered $PWD
echo
make

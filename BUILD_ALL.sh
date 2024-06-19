#!/bin/sh

FRONTEND_DIR=frontend
BACKEND_DIR=sample-backend

cd $FRONTEND_DIR
echo entered $PWD
echo
bun run build
echo Creating release tarball...
mkdir -p ../release
rm -f ../release/frontend-release.tar.gz
tar -czf ../release/frontend-release.tar.gz dist
echo

cd ../$BACKEND_DIR
echo entered $PWD
echo
make zip

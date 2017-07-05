#!/bin/bash

if ! docker build -t "$PREFIX/admin:$TAG" . ; then
	echo "Error building image"
	exit 1;
fi

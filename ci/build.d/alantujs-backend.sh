#!/bin/bash

if ! docker build -t "$PREFIX/alantujs-backend:$TAG" . ; then
    echo "Error building image"
    exit 1;
fi

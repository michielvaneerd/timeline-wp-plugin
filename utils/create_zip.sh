#!/usr/bin/env bash

# Create ZIP file that's ready for releasing to Wordpress Plugin repository.

zip -r mve-timeline.zip . -x "**/.DS_Store" -x ".DS_Store" -x ".git*" -x "docker-compose.yml" -x "node_modules/*" -x "package-lock.json" -x "package.json" -x "utils/*" -x "src/*"


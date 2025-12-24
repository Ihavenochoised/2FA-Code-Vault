#!/usr/bin/env bash
set -o errexit

echo "📦 Installing dependencies..."
npm install

echo "📍 List of installed dependencies:"
npm ls

echo "📍 Current IP address (add this to MongoDB access control)"
curl ifconfig.me

echo "✅️ Dependencies installed, ready to start!"
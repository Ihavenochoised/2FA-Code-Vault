#!/usr/bin/env bash
set -o errexit

echo "📦 Installing dependencies..."
npm install

echo "📍 List of installed dependencies:"
npm ls

echo "📍 Current IP address (add this to MongoDB access control)"
curl ifconfig.me

# Give the user 1 minute to copy the IP address
echo "⏳ You have 1 minute to copy the IP address above..."
sleep 55
echo "⏳ 5 seconds remaining..."
sleep 5

echo "✅️ Dependencies installed, ready to start!"
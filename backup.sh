#!/bin/bash
mongodump -h 127.0.0.1 --port 3001 -d meteor --collection users --out ./secrets/dump
mongodump -h 127.0.0.1 --port 3001 -d meteor --collection UserProfile --out ./secrets/dump
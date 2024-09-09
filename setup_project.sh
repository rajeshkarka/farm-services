#!/bin/bash

# Create parent directory
mkdir -p parent

# Create backend directories
mkdir -p parent/backend/api-gateway
mkdir -p parent/backend/service-discovery
mkdir -p parent/backend/monitoring
mkdir -p parent/backend/logging
mkdir -p parent/backend/caching
mkdir -p parent/backend/circuit-breaker
mkdir -p parent/backend/expenses-service
mkdir -p parent/backend/expenses-type-service
mkdir -p parent/backend/employee-service
mkdir -p parent/backend/sales-service

# Create frontend directory
mkdir -p parent/frontend

# Create mobile application directory
mkdir -p parent/mobileapplication

echo "Project structure created successfully."


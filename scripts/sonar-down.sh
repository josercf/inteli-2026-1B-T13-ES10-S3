#!/usr/bin/env bash
set -euo pipefail

echo "==> Derrubando SonarQube e volumes"
docker compose -f docker-compose.sonar.yml down -v

echo "==> Limpando artefatos do scanner"
rm -rf .scannerwork .sonar

echo "==> Pronto."

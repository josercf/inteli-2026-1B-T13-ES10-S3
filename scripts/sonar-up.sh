#!/usr/bin/env bash
set -euo pipefail

echo "==> Subindo SonarQube Community + Postgres"
docker compose -f docker-compose.sonar.yml up -d

echo "==> Aguardando SonarQube responder em http://localhost:9000"
for i in $(seq 1 60); do
  if curl -sSf http://localhost:9000/api/system/status >/dev/null 2>&1; then
    STATUS=$(curl -s http://localhost:9000/api/system/status | sed -n 's/.*"status":"\([A-Z]*\)".*/\1/p')
    if [ "$STATUS" = "UP" ]; then
      echo "==> Sonar pronto: http://localhost:9000"
      echo "    Credenciais iniciais: admin / admin (será pedida troca no primeiro login)"
      exit 0
    fi
  fi
  sleep 5
done

echo "!! Sonar não subiu em 5 minutos. Rode 'docker compose -f docker-compose.sonar.yml logs sonarqube' para investigar."
exit 1

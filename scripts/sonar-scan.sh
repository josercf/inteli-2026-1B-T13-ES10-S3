#!/usr/bin/env bash
set -euo pipefail

HOST_URL="${SONAR_HOST_URL:-http://localhost:9000}"
TOKEN="${SONAR_TOKEN:-}"

echo "==> Rodando testes com coverage"
npm test --silent

if [ -z "$TOKEN" ]; then
  echo "==> SONAR_TOKEN não definido. Usando autenticação local admin/admin."
  echo "    Para gerar um token: http://localhost:9000/account/security/"
  AUTH_ARGS=(-Dsonar.login=admin -Dsonar.password=admin)
else
  AUTH_ARGS=(-Dsonar.token="$TOKEN")
fi

echo "==> Rodando sonar-scanner contra $HOST_URL"
npx --yes sonar-scanner \
  -Dsonar.host.url="$HOST_URL" \
  "${AUTH_ARGS[@]}"

echo "==> Scan concluído. Abra $HOST_URL/dashboard?id=academic-tracker"

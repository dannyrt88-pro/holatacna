@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies...
  cmd /c npm install
)
cmd /c npm run dev

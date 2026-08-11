# CMRL Research Portal

A centralized digital infrastructure for the Crystalline Material Research Lab.

## Requirements

- Node.js >= 20
- pnpm >= 9

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Copy `.env.example` to `.env` in both `apps/web` and `apps/api`.

3. Start development servers:
   ```bash
   pnpm dev
   ```

## Structure

- `apps/web` - React Frontend (Vite)
- `apps/api` - Express Backend
- `packages/shared` - Shared code
- `packages/config` - Shared configs

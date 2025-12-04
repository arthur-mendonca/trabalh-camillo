# Library Backend

Guia rápido para iniciar o backend e acessar a documentação Swagger.

## Pré-requisitos

- Node.js 18+ e npm
- Opcional: Prisma CLI (`npx prisma -v`)

## Instalação

```bash
npm install
```

Se precisar preparar o banco (SQLite), rode:

```bash
npx prisma generate
npx prisma migrate dev
```

## Executar em desenvolvimento

```bash
npm run dev
```

- URL base: `http://localhost:3000`
- Porta pode ser configurada via `PORT` (env). Sem `PORT`, usa `3000`.

## Produção

```bash
npm run build
npm run start:prod
```

## Swagger (documentação da API)

- URL: `http://localhost:3000/docs`
- Para rotas protegidas, use o botão `Authorize` e informe um Bearer Token (JWT).
- Para obter um token, faça login em `POST /auth/login` com `email` e `password`.

## Scripts úteis

- `npm start`: inicia sem watch
- `npm run dev`: inicia com watch
- `npm run test`: executa testes
- `npm run lint`: formatação e lint

## Coleção de HTTP Requests

- vide arquivo Requests.postman_collection.json
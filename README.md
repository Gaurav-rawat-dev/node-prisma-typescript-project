==steps for project step ======
1 => 
mkdir my-node-ts-app
cd my-node-ts-app
npm init -y


2 > 
npm install express

3 > 
npm install -D typescript ts-node @types/node @types/express nodemon

4 >
npx tsc --init

5 >
tsconfig.json file 
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}


6 >
structure
my-node-ts-app/
│
├── src/
│   └── index.ts
│
├── dist/        ← compiled JS files (auto-created)
├── tsconfig.json
├── package.json
└── .gitignore

7 >
scripts 
"scripts": {
  "start": "node dist/index.js",
  "dev": "nodemon src/index.ts",
  "build": "tsc"
}

8 >
npm run dev


=============steps for errors=================
>>> if nodemon workign properly and e are nt seeing th eupdated result, htne kill all node process runing in backgrounm with teh
taskkill /F /IM node.exe
and then run npm start
>>> if ever out ypescript file give us error as annot find module .ts, then in tat case we have to install an dev dependency as
npm i -D tsx,
and then can run 
npx tsx src/index.ts


>>> when we are imporing PrismaClient from "@prisma/client" it will throw error , orrect way is 
import { PrismaClient } from "./generated/prisma";

>>> to successfully connected with prisma  STEPS:
npm init -y
npm install prisma typescript tsx @types/node --save-dev
npx tsc --init
npx prisma -- prisma cli just to chck prima installed properly and cli comands
npx prisma init --datasource-provider postgresql --output ../generated/prisma
then these commnsd will create some folder and schema , generated files

To map your data model to the database schema, you need to use the prisma migrate CLI commands:
npx prisma migrate dev --name init
This command does two things:
It creates a new SQL migration file for this migration
It runs the SQL migration file against the database
npm install @prisma/client
run prisma generate which reads your Prisma schema and generates the Prisma Client
npx prisma generate


import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  hh        Int

  @@map("users")
}



model CartItem {
  id         Int      @id @default(autoincrement())
  userId     Int
  user       User     @relation(fields: [userId], references: [id])
  productId  Int
  product    Product  @relation(fields: [productId], references: [id])
  quantity   Int
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("cart_items")
}




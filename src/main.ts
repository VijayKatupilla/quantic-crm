// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import helmet from 'helmet';
// import cookieParser from 'cookie-parser';
// import csurf from 'csurf';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // ✅ Security middlewares
//   app.use(helmet());
//   app.enableCors({ origin: '*', methods: 'GET,POST,PUT,DELETE' });

//   app.use(cookieParser());

//   app.use(
//     csurf({
//       cookie: {
//         httpOnly: true,
//         sameSite: 'lax',
//       },
//     }),
//   );

//   // ✅ Global input validation
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   await app.listen(3000);
//   console.log('🚀 Secure server running on http://localhost:3000');
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({ origin: '*', methods: 'GET,POST,PUT,DELETE' });
  app.use(cookieParser());

  // ❌ Disable this for Postman testing
  // app.use(
  //   csurf({
  //     cookie: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //     },
  //   }),
  // );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
  console.log('🚀 Secure server running on http://localhost:3000');
}
bootstrap();

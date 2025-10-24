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
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- Security Middleware ---
  app.use(helmet());
  app.enableCors({ origin: '*', methods: 'GET,POST,PUT,DELETE' });
  app.use(cookieParser());

  // ❌ Disabled CSRF for Postman testing (enabled in prod)
  // app.use(
  //   csurf({
  //     cookie: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //     },
  //   }),
  // );

  // --- Global Validation ---
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // --- Swagger Documentation ---
  const config = new DocumentBuilder()
    .setTitle('Quantic CRM API')
    .setDescription('NestJS CRM Backend with Auth, Leads, Accounts, and Activities modules')
    .setVersion('1.0')
    .addBearerAuth() // for JWT token support
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  console.log('🚀 Secure server running on http://localhost:3000');
  console.log('📘 Swagger docs available at http://localhost:3000/docs');
}

bootstrap();


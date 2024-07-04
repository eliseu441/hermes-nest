import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'; 
import * as passport from 'passport'; 

//configuração pra dar polyfill na porra do bigint

BigInt.prototype['toJSON'] = function () { 
  return this.toString()
}
passport.serializeUser(function(user, done) { 
  done(null, user); 
}); 
passport.deserializeUser(function(user, done) { 
  done(null, user); 
}); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Substitua pela URL de origem permitida
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
  });

  app.use( 
    session({ 
      secret: 'demo-session-secret', 
      resave: false, 
      saveUninitialized: false, 
    }), 
  ); 
  app.use(passport.initialize()); 
  app.use(passport.session()); 


  await app.listen(5000);
}
bootstrap();
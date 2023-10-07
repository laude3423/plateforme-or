import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VilleModule } from './module/ville/ville.module';
import { CollecteursModule } from './module/collecteurs/collecteurs.module';
import { OrpailleursModule } from './module/orpailleurs/orpailleurs.module';
import { ProductionModule } from './module/production/production.module';
import { RegistreCollecteurModule } from './module/registre-collecteur/registre-collecteur.module';
import { RegistreComptoirModule } from './module/registre-comptoir/registre-comptoir.module';
import { RegistreOrpailleurModule } from './module/registre-orpailleur/registre-orpailleur.module';
import { AgenceModule } from './module/agence/agence.module';
import { PaysModule } from './module/pays/pays.module';
import { ComptoirModule } from './module/comptoir/comptoir.module';
import { AnorModule } from './module/anor/anor.module';
import { AdministrateurModule } from './module/administrateur/administrateur.module';
import { MulterModule } from '@nestjs/platform-express';
import { CorsMiddleware } from './cors.middleware';
import { CompteModule } from './module/compte/compte.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: ['dist/**/*.entity{.js,.ts}'],
      }),
      inject: [ConfigService],
    }),
    AnorModule,
    AdministrateurModule,
    VilleModule,
    CollecteursModule,
    OrpailleursModule,
    ComptoirModule,
    AgenceModule,
    ProductionModule,
    RegistreComptoirModule,
    RegistreCollecteurModule,
    RegistreOrpailleurModule,
    PaysModule,
    CompteModule,
    MulterModule.register({
      dest: './public/Téléchargements', // Spécifiez le chemin de destination ici
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes({
      path: '/example',
      method: RequestMethod.GET,
    });
  }
}

// cors.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*'); // Remplacez '*' par le domaine de votre application React
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,OPTIONS,POST,PUT,DELETE',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    // Si vous souhaitez autoriser les cookies et les en-têtes d'authentification, ajoutez ceci :
    // res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      // Gestion des pré-vérifications CORS pour les requêtes OPTIONS
      res.sendStatus(200);
    } else {
      next();
    }
  }
}

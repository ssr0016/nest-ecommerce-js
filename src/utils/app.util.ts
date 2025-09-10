import { INestApplication } from '@nestjs/common';

export const getAllRoutes = (app: INestApplication) => {
  const server = app.getHttpAdapter().getInstance();
  const router = server._router || server.router; // Express router

  const routes = router.stack
    .filter((layer: any) => layer.route) // only layers with routes
    .map((layer: any) => {
      const path = layer.route.path;
      const methods = Object.keys(layer.route.methods).map((m) =>
        m.toUpperCase(),
      );
      return methods.map((method) => `${method} ${path}`);
    })
    .flat();

  return { routes };
};

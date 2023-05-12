import { createBrowserRouter } from 'react-router-dom';
import { generatePathConfig, traverseRoutes } from './utils';

const router = createBrowserRouter(traverseRoutes(generatePathConfig()));

export default router;

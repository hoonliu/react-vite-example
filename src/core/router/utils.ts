import { set } from 'lodash';
import type { RouteObject } from 'react-router-dom';
import createComponent from './wrapper';

// 生成 pathConfig
export function generatePathConfig() {
  const modules = import.meta.glob('/src/pages/**/*.{ts,tsx}');
  const pathConfig = {};
  Object.keys(modules).forEach((filePath) => {
    const routePath = filePath
      .replace('/src/pages/', '')
      .replace(/.tsx?/, '')
      .replace(/\[([\w-]+)]/, ':$1')
      .split('/');
    set(pathConfig, routePath, modules[filePath]);
  });
  return pathConfig;
}

// 递归遍历生成 RouteObject 结构供 createBrowserRouter 使用
export function traverseRoutes(pathConfig: Record<string, any>): RouteObject[] {
  return Object.entries(pathConfig).map(([routePath, child]) => {
    if (typeof child === 'function') {
      const isIndex = routePath === 'index';
      return {
        index: isIndex,
        path: isIndex ? undefined : routePath,
        element: createComponent(child),
      };
    } else {
      const { index, ...rest } = child;
      return {
        path: routePath,
        element: createComponent(index),
        children: traverseRoutes(rest),
      };
    }
  });
}

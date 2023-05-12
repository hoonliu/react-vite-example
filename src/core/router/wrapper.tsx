import React from 'react';

export default function createComponent(
  importer: () => Promise<{ default: React.ComponentType }>
) {
  if (!importer) {
    return null;
  }
  const Component = React.lazy(importer);
  return <Component />;
}

import React from 'react';

// Get all icon modules from the SVG files
const iconModuleContext = import.meta.glob('./icons/*.svg', {
  query: '?react',
  eager: true
}) as Record<string, { default: React.ComponentType }>;

export const getSVGIconsAsComponents = () => {
  const processedIcons = Object.keys(iconModuleContext).reduce<Record<string, React.ComponentType>>(
    (acc, path) => {
      const name = path.replace('./icons/', '').replace('.svg', ''); // Extract name from path
      acc[name] = iconModuleContext[path].default;
      return acc;
    },
    {}
  );

  return processedIcons;
};
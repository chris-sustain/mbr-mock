import React from 'react';

// Get all icon modules from the SVG files
const iconModuleContext = import.meta.glob('./icons/*.svg', {
  query: '?react',
  eager: true
}) as Record<string, { default: React.ComponentType }>;

// Create a union type of literal string values
// We need to manually define this for now since TypeScript can't infer it dynamically
// This will need to be updated when new icons are added
export type IconName = string;

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

// Extract icon names without extensions
export const availableIconNames = Object.keys(iconModuleContext).map((path) =>
  path.replace('./icons/', '').replace('.svg', '')
);

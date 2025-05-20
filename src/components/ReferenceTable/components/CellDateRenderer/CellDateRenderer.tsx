import React from 'react';
import { useTranslation } from 'react-i18next';

interface CellDateRendererProps {
  value: string;
}

export const CellDateRenderer: React.FC<CellDateRendererProps> = ({ value }) => {
  const { i18n } = useTranslation();

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return '--';
      }

      // Format based on locale
      return new Intl.DateTimeFormat(i18n.language === 'fr' ? 'fr-FR' : i18n.language, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '--';
    }
  };

  return <span>{formatDate(value)}</span>;
};

export default CellDateRenderer;

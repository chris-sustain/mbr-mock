import React from 'react';
import { useTranslation } from 'react-i18next';

interface CellAmountRendererProps {
  value: string;
}

export const CellAmountRenderer: React.FC<CellAmountRendererProps> = ({ value }) => {
  const { i18n } = useTranslation();

  const formatAmount = (amountString: string) => {
    try {
      // Remove any existing formatting and convert to number
      const amount = parseFloat(amountString.replace(/[^\d.-]/g, ''));

      // Check if amount is valid
      if (isNaN(amount)) {
        return '--';
      }

      // Format based on locale
      return new Intl.NumberFormat(i18n.language === 'fr' ? 'fr-FR' : i18n.language, {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    } catch (error) {
      console.error('Error formatting amount:', error);
      return '--';
    }
  };

  return <span>{formatAmount(value)}</span>;
};

export default CellAmountRenderer;

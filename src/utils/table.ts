export const COLUMNS_IDS = {
  // Numéro fiche de ref / titre commercial / filiale Egis propriétaire / domaine / pays / date de début / date de fin / montant total contrat / montant part Egis / montant filiale propriétaire / satisfecit
  id: 'id',
  commercialTitle: 'commercialTitle',
  egisOwnerFiliale: 'egisOwnerFiliale',
  domain: 'domain',
  country: 'country',
  startDate: 'startDate',
  endDate: 'endDate',
  totalContractAmount: 'totalContractAmount',
  egisPart: 'egisPart',
  filialePart: 'filialePart',
  satisfecit: 'satisfecit'
} as const;

export const TABLE_MODES = {
  all: 'all',
  draft: 'draft',
  validating: 'validating'
} as const;

export const COLUMN_CONFIGS = {
  id: {
    id: 'id',
    enableSorting: true,
    renderer: 'text',
    style: {
      width: '100px'
    }
  },
  commercialTitle: {
    id: 'commercialTitle',
    enableSorting: false,
    renderer: 'text',
    style: {
      width: '100%',
      minWidth: '250px'
    }
  },
  egisOwnerFiliale: {
    id: 'egisOwnerFiliale',
    enableSorting: true,
    renderer: 'text',
    style: {
      width: '100px'
    }
  },
  domain: {
    id: 'domain',
    enableSorting: true,
    renderer: 'text',
    style: {
      width: '100px'
    }
  },
  country: {
    id: 'country',
    enableSorting: true,
    renderer: 'text',
    style: {
      width: '100px'
    }
  },
  startDate: {
    id: 'startDate',
    enableSorting: true,
    renderer: 'date',
    style: {
      width: '100px'
    }
  },
  endDate: {
    id: 'endDate',
    enableSorting: true,
    renderer: 'date',
    style: {
      width: '100px'
    }
  },
  totalContractAmount: {
    id: 'totalContractAmount',
    enableSorting: true,
    renderer: 'amount',
    style: {
      width: '100px'
    }
  },
  egisPart: {
    id: 'egisPart',
    enableSorting: true,
    renderer: 'amount',
    style: {
      width: '100px'
    }
  },
  filialePart: {
    id: 'filialePart',
    enableSorting: true,
    renderer: 'amount',
    style: {
      width: '100px'
    }
  },
  satisfecit: {
    id: 'satisfecit',
    enableSorting: true,
    renderer: 'text',
    style: {
      width: '100px'
    }
  }
} as const;

export const getColumnWidth = (index: number) => {
  const configAsArray = [
    {
      id: 'select',
      enableSorting: false,
      renderer: 'custom',
      style: { width: '50px' }
    },
    ...Object.values(COLUMN_CONFIGS)
  ];

  return {
    ...configAsArray[index]?.style
  };
};

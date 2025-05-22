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
    renderer: 'text'
  },
  commercialTitle: {
    id: 'commercialTitle',
    enableSorting: false,
    renderer: 'text'
  },
  egisOwnerFiliale: {
    id: 'egisOwnerFiliale',
    enableSorting: true,
    renderer: 'text'
  },
  domain: {
    id: 'domain',
    enableSorting: true,
    renderer: 'text'
  },
  country: {
    id: 'country',
    enableSorting: true,
    renderer: 'text'
  },
  startDate: {
    id: 'startDate',
    enableSorting: true,
    renderer: 'date'
  },
  endDate: {
    id: 'endDate',
    enableSorting: true,
    renderer: 'date'
  },
  totalContractAmount: {
    id: 'totalContractAmount',
    enableSorting: true,
    renderer: 'amount'
  },
  egisPart: {
    id: 'egisPart',
    enableSorting: true,
    renderer: 'amount'
  },
  filialePart: {
    id: 'filialePart',
    enableSorting: true,
    renderer: 'amount'
  },
  satisfecit: {
    id: 'satisfecit',
    enableSorting: true,
    renderer: 'text'
  }
} as const;

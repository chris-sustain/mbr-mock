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

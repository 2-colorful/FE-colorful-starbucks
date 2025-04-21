export type RecentSearchType = { searchAt: string; keyword: string };

export interface AutoCompleteItem {
  productName: string;
}

export interface AutoCompleteData {
  autoSearchList: AutoCompleteItem[];
}

export interface SearchQueryRequestDataType {
  [key: string]: string | number;
}

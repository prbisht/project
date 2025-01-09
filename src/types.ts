export interface DataItem {
  name: string;
  type: string;
  url: string;
  identifier: string;
  description: string;
  published_at: string;
  publicationStatuses: string[];
  parentDataverseName: string;
  parentDataverseIdentifier: string;
}

export interface ApiResponse {
  status: string;
  data: {
    q: string;
    total_count: number;
    start: number;
    spelling_alternatives: Record<string, unknown>;
    items: DataItem[];
  };
}
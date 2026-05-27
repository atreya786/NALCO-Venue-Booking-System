export interface Venue {
  venue_id: number;

  venue_name: string;

  location: string;

  capacity: number;

  venue_type: string;

  is_active: boolean;

  created_at?: string;
}

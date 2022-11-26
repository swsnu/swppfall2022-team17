export interface Cafe {
  id: number;
  is_managed: false;
  name: string;
  phone_number: string;
  location: string[];
  address: string;
}

export interface ManagedCafe extends Omit<Cafe, "is_managed"> {
  is_managed: true;
  avatar: string;
  crowdedness: 0 | 1 | 2 | 3;
  force_closed: boolean;
  introduction: string;
  managers: number[];
  owner: number;
  registration_number: number;
}

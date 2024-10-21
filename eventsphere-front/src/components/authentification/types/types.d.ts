type registerUserData = {
  email: string;
  lastname: string;
  firstname: string;
  username: string;
  address: string;
  ip_address?: string,
  city: string;
  postal_code: string;
  phone_number: string;
  password: string;
  confirm_password: string
  terms_accepted: boolean;
  newsletter_subscribed?: boolean;
}

type loginUserData = {
  email: string;
  password: string;
};

type registerOrganismData = {
  personal_lastname: string;
  personal_firstname: string;
  personal_email: string;
  personal_address: string;
  personal_address_two: string;
  personal_city: string;
  personal_region: string;
  personal_phone: string;
  password: string;
  organization_name: string;
  organization_email: string;
  organization_phone: string;
  organization_address: string;
  organization_address_two: string;
  organization_city: string;
  organization_postal_code: string;
  organization_region: string;
  organization_type: string;
}

type loginOrganismData = {
  email: string;
  password: string;
}




export const initialState = {
  user_id: null,
  user_name: null,
  login_status: null,
  email: null,
  full_name: null,
  location: null,
  phone_no: null,
  gender: null,
  avatar: null,
  company_id: null,
  company_name: null,
  company_description: null,
  company_email: null,
  company_location: null,
  company_phone_number: null,
  company_avatar: null,
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return {
        user_id: payload.user_id,
        user_name: payload.user_name,
        email: payload.email,
        login_status: true,
        full_name: payload.full_name,
        location: payload.location,
        phone_no: payload.phone_no,
        gender: payload.gender,
        avatar: payload.avatar,
      };

    case "LOGOUT":
      return {
        user_id: null,
        user_name: null,
        email: null,
        login_status: false,
        name: null,
        location: null,
        phone_no: null,
        gender: null,
        avatar: null,
      };
    case "COMPANY_DATA":
      return {
        company_id: payload.company_id,
        company_name: payload.company_name,
        company_description: payload.company_description,
        company_email: payload.company_email,
        company_location: payload.company_location,
        company_phone_number: payload.company_phone_number,
        company_avatar: payload.company_avatar,
      };
    case "COMPANY_RESET":
      return {
        company_id: null,
        company_name: null,
        company_description: null,
        company_email: null,
        company_location: null,
        company_phone_number: null,
      };
    case "COMBINED":
      return {
        user_id: payload.user_id,
        user_name: payload.user_name,
        email: payload.email,
        login_status: true,
        full_name: payload.full_name,
        location: payload.location,
        phone_no: payload.phone_no,
        gender: payload.gender,
        avatar: payload.avatar,
        company_id: payload.company_id,
        company_name: payload.company_name,
        company_description: payload.company_description,
        company_email: payload.company_email,
        company_location: payload.company_location,
        company_phone_number: payload.company_phone_number,
        company_avatar: payload.company_avatar,
      };
    default:
      return state;
  }
};

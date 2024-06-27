export const AUTH_PROVIDERS = {
  KEYCLOAK: 'keycloak',
};

export const VALID_ROLES = ['user', 'owner'];

export const CATEGORY_MAPPING: { [key: string]: string } = {
  basketball: 'Sân bóng rổ',
  volleyball: 'Sân bóng chuyền',
  badminton: 'Sân cầu lông',
  tennis: 'Sân tennis',
  football: 'Sân bóng đá',
  tableTennis: 'Sân bóng bàn',
  billiards: 'Bi-da',
};

export const CRUD_ACTIONS: { [key: string]: string } = {
  create: 'Tạo',
  edit: 'Chỉnh sửa',
  view: 'Xem',
  delete: 'Xóa',
};

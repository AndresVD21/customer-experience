export const formatPhone = (phone: string) => {
  const match = phone.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '' + match[1] + '-' + match[2] + '-' + match[3];
  }
  return null;
};

export const revertPhoneFormat = (phone: string) => {
    return phone.split('-').join('');
}

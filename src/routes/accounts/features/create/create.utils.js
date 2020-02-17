export const validateAccount = value => {
  if (!value) {
    return {
      error: true,
      message: 'Required',
    };
  }
  if (/\s/.test(value)) {
    return {
      error: true,
      message: 'Please use a valid account name (Ex: "Cat, Account-1,..").',
    };
  }
  return {
    error: false,
    message: '',
  };
};

export const isExist = (accountName = '', listAccount = []) =>
  listAccount.some(
    item =>
      String(item.name).toLowerCase() === String(accountName).toLowerCase(),
  );

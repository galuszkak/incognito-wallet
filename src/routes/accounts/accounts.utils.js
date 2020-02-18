const fieldRequired = {
  error: true,
  message: 'Required',
};

const noError = {
  error: false,
  message: '',
};

export const validateAccount = value => {
  if (!value) {
    return fieldRequired;
  }
  if (/\s/.test(value)) {
    return {
      error: true,
      message: 'Please use a valid account name (Ex: "Cat, Account-1,..").',
    };
  }
  return noError;
};

export const validatePrivateKey = value => {
  if (!value) {
    return fieldRequired;
  }
  return noError;
};

export const isExist = (accountName = '', listAccount = []) =>
  listAccount.some(
    item =>
      String(item.name).toLowerCase() === String(accountName).toLowerCase(),
  );

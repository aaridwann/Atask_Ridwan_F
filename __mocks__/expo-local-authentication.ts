export const Constants = {
  Fingerprint: 1,
  FaceID: 2,
};

export const supportedAuthenticationTypesAsync = jest.fn(() => {
  return Promise.resolve([Constants.Fingerprint, Constants.FaceID]);
});

export const authenticateAsync = jest.fn(() => {
  return Promise.resolve({ success: true });
});

export default {
  Constants,
  supportedAuthenticationTypesAsync,
  authenticateAsync,
};

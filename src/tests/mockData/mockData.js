const mockData = {
  verifiedUser: { email: 'user@caretbn.com', password: 'Pa55w0rd' },
  registeredUser: { email: 'ghost@caretbn.com', password: 'Pa55w0rd' },
  unVerifiedUser: { email: 'johndoe@test.com', password: 'Pa55w0rd' },
  invalidData: { email: 'email@email.com', password: 'password' },
  missingFields: { email: '', password: '' }
};
export default mockData;

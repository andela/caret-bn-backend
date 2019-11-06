const mockData = {
  verifiedUser: { email: 'user@caretbn.com', password: 'Pa55w0rd' },
  verifiedUser1: { id: 3, email: 'ghost@caretbn.com', password: 'Pa55w0rd' },
  verifiedUser3: { id: 100, email: 'ghos@caretbn.com', password: 'Pa55w0rd' },
  registeredUser: { email: 'ghost@caretbn.com', password: 'Pa55w0rd' },
  unVerifiedUser: { email: 'johndoe@test.com', password: 'Pa55w0rd' },
  invalidData: { email: 'email@email.com', password: 'password' },
  missingFields: { email: '', password: '' },
  missingData:{name: '', locationId: ''},
  requester:{email: 'mateso@caretbn.com', password: 'Pa55w0rd' },
  admin:{email: 'alain@caretbn.com', password: 'Pa55w0rd' },
  fakeGender: { gender: 'xxxx' },
  missingFields: { email: '', password: '' },
  supplier:{email: 'supplier@caretbn.com', password: 'Pa55w0rd'},
  manager:{email: 'manager@caretbn.com', password: 'Pa55w0rd'},
  anotherManager:{email: 'anothermanager@caretbn.com', password: 'Pa55w0rd'},
  bookingdata:{checkInDate:'2019-12-22',checkOutDate:'2019-12-30',roomsNumber:3,accomodationId:3},
  bookingdata2:{checkInDate:'2019-12-22',checkOutDate:'2019-12-30',roomsNumber:3,accomodationId:6763},
  bookingdata3:{checkInDate:'2019-12-22',checkOutDate:'2019-12-30',roomsNumber:3,accomodationId:-3},
  bookingdata4:{checkInDate:'2019-12-22',checkOutDate:'2019-12-30',roomsNumber:4,accomodationId:4},
  bookingdata5:{checkInDate:'2019-12-22',checkOutDate:'2019-12-30',roomsNumber:50,accomodationId:2},
  invalidBookingData:{checkInDate:'2019-12-22',checkOutDate:'',roomsNumber:3,accomodationId:3},
  invalidBookingDate:{checkInDate:'2019-12-22',checkOutDate:'2019-12-20',roomsNumber:3,accomodationId:3},
  OutdateBookingDate:{checkInDate:'2019-02-22',checkOutDate:'2019-02-25',roomsNumber:3,accomodationId:3},
  travelAdmin:{email: 'travelAdmin@caretbn.com', password: 'Pa55w0rd'},
  activationInfo: {reasons: 'This is a valid reason to take action on your accommodation'},
  commentData:{comment:'change dates'},
  emptyComment:{comment:''},
  anotherSupplier:{email: 'anothersupplier@caretbn.com', password: 'Pa55w0rd'},
};
export default mockData;

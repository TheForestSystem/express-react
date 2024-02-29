class User{
  constructor(
    uuid,
    fname,
    lname,
    email,
    password,
  ){
    this.uuid = uuid;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
  }
}

module.exports = User;
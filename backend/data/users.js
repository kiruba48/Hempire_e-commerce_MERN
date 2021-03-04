import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'kiruba',
    email: 'kiruba@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'karan',
    email: 'karan@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;

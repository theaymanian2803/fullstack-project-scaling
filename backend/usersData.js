import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    // Hashing the password '123456'
    password: bcrypt.hashSync('123456', 10), // 10 is the salt rounds
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    // Hashing the password '123456'
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    // Hashing the password '123456'
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]

export default users

const mongoose = require('mongoose');
const fs = require('fs');

const uri = "mongodb+srv://adnanca00:WxsJYdRU76LacZGv@restaurant.um9asbg.mongodb.net/?appName=Restaurant";

async function run() {
  await mongoose.connect(uri);
  
  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
  const Leave = mongoose.model('Leave', new mongoose.Schema({}, { strict: false }));

  const users = await User.find({});
  const leaves = await Leave.find({});

  const data = {
    users: users.map(u => ({ id: u._id, role: u.role, name: u.name, email: u.email })),
    leaves: leaves
  };

  fs.writeFileSync('db_out.json', JSON.stringify(data, null, 2), 'utf8');

  mongoose.disconnect();
}

run().catch(console.dir);

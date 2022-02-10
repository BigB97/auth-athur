const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;
      //Hash password and Salt Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Create a new user
      const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });

      if (!user) throw new Erorr("User not created");
      return res.status(200).json({ result: user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({email});
      if(!user) return res.status(404).send("Email Not Found, Please Register")
      
      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) return res.status(400).json({result: "Bobo Wrong Password, Shine youe eye well"});
      return res.status(200).json({result: "Welcome to our platform"})
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

// bycrpt

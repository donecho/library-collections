const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerSchema } = require("../utils/validator");
//     const { name, email, password } = req.body;
//     const { error } = registerSchema.validate(req.body);

//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }


//     if (password.length < 6) {
//       return res.status(400).json({ message: "Weak Password" });
//     }

//     // check user exist
//     const userExist = await User.findOne({ email });
//     if (userExist) return res.status(400).json({ message: 'User already exists' });

//     // hash password
//     const hash = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hash
//     });

//     res.json({ message: 'Register Success' });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false, // IMPORTANT
    });

    if (error) {
      const errors = error.details.map(err => ({
        field: err.path[0],
        message: err.message,
      }));

      return res.status(400).json({ errors });
    }

    let { name, email, password } = value;

    name = name.trim();
    email = email.toLowerCase().trim();

    // password rule
    const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/;
    if (!strongPassword.test(password)) {
      return res.status(400).json({
        errors: [
          {
            field: "password",
            message:
              "Password must include uppercase, lowercase & number",
          },
        ],
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        errors: [
          {
            field: "email",
            message: "Email already registered",
          },
        ],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      message: "Register Success",
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

     // IMPORTANT: include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Wrong Password' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

     res.json({
      token,
      role: user.role,
      name: user.name,
      email: user.email
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

 


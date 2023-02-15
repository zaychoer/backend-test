const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    const exist = await User.findOne({
      email: rest.email,
    });

    if (exist)
      return res.status(400).send({ message: 'User already exist' });

    const user = new User({
      ...rest,
    });
    const salt = await bcrypt.genSalt(12);
    const hasPasssword = await bcrypt.hash(password, salt);
    user.password = hasPasssword;
    user.save();

    res.send({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).send({ message: 'User Not Found' });

    try {
      const response = await bcrypt.compare(password, user.password);
      if (response) {
        const token = await jwt.sign(
          {
            id: user._id,
            email: user.email,
            name: user.name,
          },
          process.env.JWT_PRIVATE_KEY
        );

        res.send({ user, token, message: 'Login successfully' });
      }
    } catch (err) {
      return res
        .status(400)
        .send({ message: 'Invalid Username or password' });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById({ _id: id });

    res.send({ user, message: 'get profile successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};

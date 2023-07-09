const express=require('express')
const app=express()

const cors = require('cors');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose=require('mongoose')
const User=require("./db/user");
const Candidate=require("./db/Candidate")
const dotenv= require('dotenv')
dotenv.config()

const saltRounds = 10; // Number of salt rounds for bcrypt

const corsOptions = {
  origin: "https://recruitment-solution-frontend-ggknsxzvb-vaishali054.vercel.app/", // frontend URI (ReactJS)
}
app.use(cors(corsOptions));
app.use(express.json())



app.post('/api/signin', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  try {
    const { username, email, password,profile } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    const existingUserName=await User.findOne({username})
    if(existingUserName){

      return res.status(409).json({ message: 'Username already exists' });
    }
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the encrypted password
    const newUser = new User({ username, email, password: hashedPassword, profile });
    await newUser.save();

    // Return a success response
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { username, password } = req.body;

  try {
    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    }).select('-_id,-__v,-password')
    

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }
    // Generate a token
  // const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '2h' });

  // Set the token as a cookie (Note: Use secure: true in production for HTTPS)
  // res.cookie('token', token, { httpOnly: true });

  // Return success response with token
  // Successful login
  
    return res.status(200)
    .cookie('token', token, { httpOnly: false})
    .json({user})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});



app.post('/api/search', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { role, location } = req.body;
console.log(role)
  try {
    let query = { role };

    if (location) {
      query = { ...query, location };
      console.log(query)
    }
    
    console.log(query)
    const candidates = await Candidate.find(query).select('-_id -__v');
    console.log(candidates)
    res.json({ candidates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/candidates', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  try {
    const { name, role, location, experience, skills } = req.body;

    const candidate = new Candidate({
      name,
      role,
      location,
      experience,
      skills
    });

    const savedCandidate = await candidate.save();

    res.status(201).json(savedCandidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



if(process.env.API_PORT){
  app.listen(process.env.API_PORT)
}

import jwt from 'jsonwebtoken';
import user from '../models/user.model';
import signupvalidation from '../validation/user.validation';


const createUser = (req, res) => {
  // input validation;
  const { error } = signupvalidation(req.body);
  if (error) return res.status(400).json({
    status:400,
    error:error.details[0].message});

  // checking existing user
  const user_token = {
    id: user.length + 1,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    is_admin: 'false',
  };

  const new_email = req.body.email;
  const exist_email = user.find(exist => exist.email === new_email);
  if (exist_email) {
 return res.status(400).json({
    status: 400,
    error: 'this email is already exist',
  }); 
}

  const token = jwt.sign({ user_token }, 'scretkey');
  res.header('x-auth-token', token);

  const new_user = {
    id: user.length + 1,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    address: req.body.address,
    is_admin:'false',
  };


  user.push(new_user);

  return res.status(200).json({
    token:token,
    data: new_user
  });
};

export default createUser;

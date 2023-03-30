import UserService from "../service/user.service.js";

export const CurrentUser = async (req ,res) => {
    const curntUser  = req.user;
    //console.log(currntUser);
    try{
        
        if(!curntUser){
            return res.status(400).send({ err: 'User Not Logged In'});
        }

        const userDoc = await UserService.findUserByEmail(curntUser.email);
        const user = userDoc?.toJSON();
    
        delete user?.password;
        res.status(200).json(user);

    }catch(err){
        res.status(400).send({ err: err });

    }

}


export const RegisterUser = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    const existingUser = await UserService.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).send({
        err: "User already Exits",
      });
    }

    const user = await UserService.register(fname, lname, email, password);
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const LoggedUser =  await UserService.login(email , password);

    res.status(200).send(LoggedUser);

  } catch (err) {
        res.status(400).send({ err: err.message})

  }
};

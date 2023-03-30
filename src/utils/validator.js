import { validationResult } from "express-validator"
import { verifyToken } from "../service/auth.service.js";

export const validate = (validations) => {
    return async (req, res, next) => {
      await Promise.all(validations.map((validation) => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ err: errors });
    };
  };


  export const authGuard = async (req, res, next) => {
    const authToken = req.headers['authorization'];
    if (!authToken) {
        return res.status(400).send({
            err: 'Forbinded Resources1'
        })
    }

    try {
        const payload = await verifyToken(authToken.split('Bearer ')[1]);
        req.user = payload;
        next();
    } catch(err) {
        return res.status(400).send({
            err: 'Forbinded Resources2'
        })
    }
}

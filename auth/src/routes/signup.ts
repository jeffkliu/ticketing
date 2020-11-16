import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import {
  RequestValidationError,
  BadRequestError,
  DatabaseConnectionError,
  validateRequest,
} from '@jlgittix/common';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { isConstructorDeclaration } from 'typescript';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4-20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Email taken, don't add!");
      throw new BadRequestError('Email taken!');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );

    // Store it on the session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  },
);
export { router as signUpRouter };

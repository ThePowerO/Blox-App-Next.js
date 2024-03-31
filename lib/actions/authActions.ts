"use server";

import { User } from '@prisma/client';
import prisma from '../prisma';
import * as bcrypt from 'bcrypt';
import { compileActivationTemplate, compileResetPasswordTemplate, sendMail } from '../mail';
import { signJwt, verifyJwt } from '../jwt';

export async function registerUser( user: Omit<User, "id" | "image" | "emailVerified" | "name" | "createdAt" | "updatedAt"> ) {
  const result = await prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password!, 11),
    }
  });

  // send activation email
  const jwtUserId = signJwt({id: result.id})
  const activationUrl = `${process.env.NEXTAUTH_URL}/activation/${jwtUserId}`;
  const body = compileActivationTemplate(user.email!, activationUrl);
  await sendMail({to: user.email!, subject: "Account Activation", body});
  return result;
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return !!existingUser;
}

type ActivateUserFunc = (
  jwtUserId: string
) => Promise<"userNotExist" | "alreadyActivated" | "success">

export const activateUser: ActivateUserFunc = async (jwtUserID) => {
  const payload = verifyJwt(jwtUserID);
  const userId = payload?.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!user) return "userNotExist";
  if (user.emailVerified) return "alreadyActivated";
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      emailVerified: new Date(),
    }
  });
  return "success";
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) throw new Error("Invalid Email");

  // send email to reset password
  const jwtUserId = signJwt({
    id: user.id
  })
  const resetPassUrl = `${process.env.NEXTAUTH_URL}/reset-password/${jwtUserId}`;
  const body = compileResetPasswordTemplate(user.name!, resetPassUrl);
  const sendResult = await sendMail({
    to: user.email!,
    subject: "Reset Password",
    body: body
  })
  return sendResult;
}

type ResetPasswordFunc = (
  jwtUserId: string,
  password: string
) => Promise<"userNotExist" | "success">

export const ResetPassword:ResetPasswordFunc = async (jwtUserId, password) => {
  const payload = verifyJwt(jwtUserId);
  if (!payload) return "userNotExist";
  const userId = payload.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!user) return "userNotExist";
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      password: await bcrypt.hash(password, 11),
    }
  });
  if (result) return "success";
  else throw new Error("Something went wrong");
}
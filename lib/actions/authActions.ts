"use server";

import { User } from '@prisma/client';
import prisma from '../prisma';
import * as bcrypt from 'bcrypt';
import { compileActivationTemplate, compileResetPasswordTemplate, sendMail } from '../mail';
import { signJwt, verifyJwt } from '../jwt';
import NoAvatar from '@/public/Icons/noavatar.png';
import { getLocale } from 'next-intl/server';

export async function registerUser( user: Omit<User, "id" | "image" | "emailVerified" | "createdAt" | "updatedAt" 
  | "stripeCustomerId" | "highlights" | "starterPack" | "proPack" | "isPlusPack" | "plusPackWeeklyTime" 
  | "nameChangeExpiration" | "description"> ) {
  const result = await prisma.user.create({
    data: {
      image: NoAvatar.src,
      ...user,
      password: await bcrypt.hash(user.password!, 11),
      
    }
  });

  // send activation email
  const locale = await getLocale();
  const jwtUserId = signJwt({id: result.id})
  const activationUrl = 
  `${process.env.NODE_ENV === "production" ? process.env.NEXTAUTH_URL2 : process.env.NEXTAUTH_URL}/activation/${jwtUserId}`;
  
  const description = locale === 'en' ? "You've successfully sent your email to activate your account, you can now click right bellow in order to Activate Account." : "" ||
  locale === 'pt' ? "Você enviou com sucesso seu e-mail para ativar sua conta, agora você pode clicar logo abaixo para Ativar conta." : "" ||
  locale === 'de' ? "Sie haben Ihre E-Mail zur Aktivierung Ihres Kontos erfolgreich gesendet. Sie können jetzt unten rechts klicken, um das Konto zu aktivieren." : "" ||
  locale === 'it' ? "Hai inviato con successo la tua email per attivare il tuo account, ora puoi cliccare in basso per attivare l'account." : "" ||
  locale === 'fr' ? "Vous avez envoyé avec succès votre e-mail pour activer votre compte, vous pouvez maintenant cliquer ci-dessous pour activer le compte." : "" ||
  locale === 'jp' ? "アカウントを有効化するためのメールの送信が完了しました。アカ​​ウントを有効化するには、右下をクリックしてください。" : "" ||
  locale === 'kr' ? "계정을 활성화하기 위한 이메일을 성공적으로 보냈습니다. 이제 바로 아래를 클릭하여 계정을 활성화할 수 있습니다." : "" ||
  locale === 'cn' ? "你已成功发送电子邮件以激活你的帐户，现在你可以单击右下方以激活帐户。" : ""
  const activatebtn = locale === 'en' ? "Activate Account" : "" ||
  locale === 'pt' ? "Ativar conta" : "" ||
  locale === 'de' ? "Account aktivieren" : "" ||
  locale === 'it' ? "Attiva l'account" : "" ||
  locale === 'fr' ? "Activer compte" : "" ||
  locale === 'jp' ? "アカウントの有効化" : "" ||
  locale === 'kr' ? "계정 활성화" : "" ||
  locale === 'cn' ? "帐户激活" : ""
  const hi = locale === 'en' ? "Hi" : "" ||
  locale === 'pt' ? "Olá" : "" ||
  locale === 'de' ? "Hallo" : "" ||
  locale === 'it' ? "Ciao" : "" ||
  locale === 'fr' ? "Bonjour" : "" ||
  locale === 'jp' ? "こんにちは" : "" ||
  locale === 'kr' ? "안녕하세요" : "" ||
  locale === 'cn' ? "你好" : ""
  const activationtitle = locale === 'en' ? "Account Activation" : "" ||
  locale === 'pt' ? "Ativação de conta" : "" ||
  locale === 'de' ? "Accountaktivierung" : "" ||
  locale === 'it' ? "Attivazione account" : "" ||
  locale === 'fr' ? "Activation du compte" : "" ||
  locale === 'jp' ? "アカウントの有効化" : "" ||
  locale === 'kr' ? "계정 활성화" : "" ||
  locale === 'cn' ? "帐户激活" : ""

  const body = compileActivationTemplate(activationtitle, activatebtn, description, hi, user.name, activationUrl);
  await sendMail({to: user.email!, subject: activationtitle, body});
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
  const locale = await getLocale();
  const jwtUserId = signJwt({
    id: user.id
  })
  const resetPassUrl =
  `${process.env.NODE_ENV === "production" ? process.env.NEXTAUTH_URL2 : process.env.NEXTAUTH_URL}/reset-password/${jwtUserId}`;
  
  const description = locale === 'en' ? "You've successfully sent your email to reset your password, you can now click right bellow in order to Reset Password." : "" ||
  locale === 'pt' ? "Você enviou com sucesso seu e-mail para redefinir sua senha, agora você pode clicar logo abaixo para Redefinir a senha." : "" ||
  locale === 'de' ? "Sie haben Ihre E-Mail zum Zurücksetzen Ihres Passworts erfolgreich gesendet. Sie können jetzt unten rechts klicken, um das Passwort zurückzusetzen." : "" ||
  locale === 'it' ? "Hai inviato correttamente la tua email per reimpostare la tua password, ora puoi fare clic a destra qui sotto per reimpostare la password." : "" ||
  locale === 'fr' ? "Vous avez envoyé avec succès votre e-mail pour reinitialiser votre mot de passe, vous pouvez maintenant cliquer ci-dessous pour réinitialiser le mot de passe." : "" ||
  locale === 'jp' ? "パスワードをリセットするためのメールが正常に送信されました。パスワードをリセットするには、下記をクリックしてください。" : "" ||
  locale === 'kr' ? "비밀번호 재설정을 위한 이메일을 성공적으로 보냈습니다. 이제 바로 아래를 클릭하여 비밀번호를 재설정할 수 있습니다." : "" ||
  locale === 'cn' ? "您已成功发送重置密码的电子邮件，现在可以单击右下方的重置密码。" : ""
  const resetpasswordbtn = locale === 'en' ? "Reset Password" : "" ||
  locale === 'pt' ? "Redefinir senha" : "" ||
  locale === 'de' ? "Passwort zurücksetzen" : "" ||
  locale === 'it' ? "Resettare password" : "" ||
  locale === 'fr' ? "Nouveau mot de passe" : "" ||
  locale === 'jp' ? "パスワードのリセット" : "" ||
  locale === 'kr' ? "비밀번호 재설정" : "" ||
  locale === 'cn' ? "帐户激活" : ""
  const welcome = locale === 'en' ? "Welcome" : "" ||
  locale === 'pt' ? "Bem-vindo" : "" ||
  locale === 'de' ? "Willkommen" : "" ||
  locale === 'it' ? "Benvenuti" : "" ||
  locale === 'fr' ? "Bienvenue" : "" ||
  locale === 'jp' ? "ようこそ" : "" ||
  locale === 'kr' ? "환영합니다" : "" ||
  locale === 'cn' ? "你好" : ""
  const forgotpasswordtitle = locale === 'en' ? "Reset Password" : "" ||
  locale === 'pt' ? "Redefinir senha" : "" ||
  locale === 'de' ? "Passwort zurücksetzen" : "" ||
  locale === 'it' ? "Resettare password" : "" ||
  locale === 'fr' ? "Nouveau mot de passe" : "" ||
  locale === 'jp' ? "パスワードのリセット" : "" ||
  locale === 'kr' ? "비밀번호 재설정" : "" ||
  locale === 'cn' ? "帐户激活" : ""
  
  const body = compileResetPasswordTemplate(resetpasswordbtn, description, forgotpasswordtitle, welcome, user.name, resetPassUrl);
  const sendResult = await sendMail({
    to: user.email!,
    subject: resetpasswordbtn,
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
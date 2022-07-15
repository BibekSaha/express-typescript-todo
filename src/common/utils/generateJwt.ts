import jwt from 'jsonwebtoken';

export const generateJwt = (data: { userId: string }) => {
  const { SECRET_KEY = 'superSecretKey' } = process.env;
  return jwt.sign(
    { data },
    SECRET_KEY, 
    { expiresIn: '30d' }
  );
}

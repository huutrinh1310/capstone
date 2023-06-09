import NextAuth from 'next-auth';
import options from '../../../../../options';
export const authOptions = NextAuth(options);

export { authOptions as GET, authOptions as POST };

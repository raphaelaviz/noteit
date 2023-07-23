import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../../prisma/prisma'
import NextAuth from 'next-auth/next'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),

    ],
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        session({ session, user }) {
            return { ...session, user: { ...session.user, id: user.id } }
        },
        async signIn({ user }) {
            const existingUser = user.email
                ? await prisma.user.findUnique({ where: { email: user.email } })
                : null

            if (existingUser && existingUser.firstLogin) {
                const starterAssistances = await prisma.assistance.findMany({
                    where: { starter: true },
                })

                // Copy each starter assistance for the user, associating with the userId and marking it as non-starter
                for (const assistance of starterAssistances) {
                    await prisma.assistance.create({
                        data: {
                            ...assistance,
                            id: undefined,
                            userId: existingUser.id,
                            starter: false,
                        },
                    })
                }

                // Update the user's firstLogin status
                await prisma.user.update({
                    where: { id: existingUser.id },
                    data: { firstLogin: false },
                })
            }

            // Continue the sign in process
            return true
        },
    },

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

@Resolver(User)
export class UserResolver {

    @Mutation(_ => User)
    async createUser(
        @Arg("email") email: string,
        @Arg("role") role: string,
        @Arg("password") password: string,
    ): Promise<User> {
        const hashedPassword: string = await argon2.hash(password);
        const user = new User(email, role, hashedPassword);
        await user.save()
        return user;
    }

    @Query(_ => User)
    async getOneUser(
        @Arg("id") id: number,
    ): Promise<User | null> {
        const user: User | null = await User.findOneBy({ id });
        return user;
    }

    @Query(_ => [User])
    async getAllUsers(): Promise<User[] | null> {
        const users: User[] | null = await User.find();
        return users;
    }

    // Login avec JWT
    @Mutation(_ => String)
    async login(
        @Arg("email") email: string,
        @Arg('password') password: string
    ): Promise<string> {
        // 1. Retrouver l'utilisateur
        const user: User = await User.findOneOrFail({
            where: {
                email
            }
        });

        // 2. Comparer les passwords
        const hashedPassword = await argon2.hash(password);
        const isValid: boolean = await argon2.verify(user.passwordHashed, hashedPassword)
        if (isValid!) {
            throw new Error("Argon2 doesn't recognize the password")
        }

        // 3. Générer le JWT
        const jwtSecret: string | undefined = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('invalid JWT secret');
        }

        const token: string = jwt.sign({ email, role: user.role }, jwtSecret, {
            expiresIn: '24h'
        });
        return token;
    }

    // Incrémenter le total d'étoiles d'un user
    @Mutation(_ => Int)
    async addStarsToUser(
        @Arg('stars') stars: number,
        @Arg('userId') userId: number,
    ): Promise<Number | undefined> {
        const user: User | null = await User.findOneBy({ id: userId });
        if (!user) {
            throw new Error('No user found')
        }
        if (user.stars) {
            user.stars += stars;
            await user.save();
        }
        return user.stars;
    }
}
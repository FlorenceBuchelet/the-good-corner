import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import * as argon2 from 'argon2';
import jwt, { Secret } from 'jsonwebtoken';

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
        return user;
    }

    @Query(_ => String)
    async login(
        @Arg("email") email: string,
        @Arg('password') password: string
    ): Promise<string> {
        console.log("user log ", email, password);
        
        const isValid: boolean = await argon2.verify(user.passwordHashed, password)
        if (isValid!) {
            throw new Error("Argon2 doesn't recognize the password")
        }
        //const hashedPassword: string = await argon2.hash(password);

        User.findOneOrFail({
            where: {
                email,
                // passwordHashed: hashedPassword
            }
        });

        const jwtSecret: string | undefined = process.env.JWT_SECRET;
        console.log("jwt secret: ", jwtSecret);
        if (!jwtSecret) {
            throw new Error('invalid JWT secret');
        }

        const token: string = jwt.sign({ email, role: user.role }, jwtSecret);
        
        return token;
    }

}
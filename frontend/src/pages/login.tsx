import { USER_LOGIN } from "@/graphQL/user";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

interface LoginFormData {
    email: string,
    password: string,
}

export const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'authToken';

function Login() {
    const { handleSubmit, register } = useForm<LoginFormData>();

    const [login, { data, loading, error }] = useMutation(USER_LOGIN);

    const onLoginFormSubmitted = async (formData: LoginFormData) => {
        console.log("Form data in login", formData);
        await login({
            variables: {
                email: formData.email,
                password: formData.password
            }
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log("Retour de data du login", data);
    if (data) {
        const token: string | undefined = data.login
        token ? localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, token) : null;
    };

    return (
        <>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit(onLoginFormSubmitted)}>
                <label>
                    Email
                    <input type="text" {...register('email', { required: true })} placeholder="Email" />
                </label>
                <label>
                    Password
                    <input type="password" {...register('password', { required: true })} placeholder="Password" />
                </label>
                <input type="submit" value="Okidoki" />
            </form>
        </>
    );
}

export default Login;

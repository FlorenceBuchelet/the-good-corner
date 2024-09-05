import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from '@/contexts/authContext';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/'
});

const authHeaderLink = setContext(( request, { headers }) => {
    const token: string | null = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);

    return {
        headers: {
            ...headers,
            'content-type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}) 
        }
    };
});

const apolloClient = new ApolloClient({
    link: authHeaderLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default apolloClient;

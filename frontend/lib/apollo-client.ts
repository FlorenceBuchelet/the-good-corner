import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
    headers: {
        'content-type': 'application/json',
    }
});

export default apolloClient;

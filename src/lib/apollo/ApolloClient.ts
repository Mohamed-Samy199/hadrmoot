import { hostUrl } from "@/utils/hostUrl"
import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    uri: `${hostUrl}/graphql/users`,
    cache: new InMemoryCache()
});

export default client;

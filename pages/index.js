import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export default function Home({ countries }) {
  return (
    <div>
      <h1>Next Js with Graphql</h1>
      {countries.map((country) => (
        <p key={country.code}>{country.name}</p>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: "https://countries.trevorblades.com",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries,
    },
  };
}

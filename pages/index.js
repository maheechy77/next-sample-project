import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import style from "./index.module.css";

export default function Home({ countries }) {
  return (
    <div>
      <h1>Next Js with Graphql</h1>
      <div className={style.flex}>
        {countries.map((country, index) => (
          <div className={style.flexChild}>
            {index + 1} <p key={country.code}>{country.name}</p>
          </div>
        ))}
      </div>
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

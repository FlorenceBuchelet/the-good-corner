import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import RecentAds from "@/components/RecentAds";
import { useQuery, gql } from "@apollo/client";

const GET_LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error.</p>;
  return (
    <div className="App">
      {data.launches.map((launch: any) => (
        <li key={launch.id}>{launch.launch_date_utc}</li>
      ))}
    </div>
  );
}

/* export default function Home() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);
  return (
    <>
      <main className="main-content">
        <RecentAds />
      </main>
    </>
  );
} */

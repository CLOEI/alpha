import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

function useAuth() {
  const { data, refetch, loading } = useQuery(gql`
    query Query {
      verified {
        id
        role
        username
      }
    }
  `);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!loading) {
      setUser(data.verified);
    }
  }, [data, loading]);

  return { user, refetch, loading };
}

export default useAuth;

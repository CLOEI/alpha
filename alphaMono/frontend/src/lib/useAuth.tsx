import { useEffect, useState } from "react";
import api from "./api";
import { gql } from "@apollo/client";

function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.query({
      query: gql`
        query Query {
          verify
        }
      `,
    });
  }, []);

  return [user, setUser];
}

export default useAuth;

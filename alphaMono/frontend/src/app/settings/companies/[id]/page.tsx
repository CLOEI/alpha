"use client";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardHeader,
  Divider,
  Spacer,
} from "@nextui-org/react";
import { Pen, Plus } from "lucide-react";
import Clients from "./Clients";
import { useState } from "react";
import Hero from "./Hero";

function Page({ params }: any) {
  const [heroModal, setHeroModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { loading, data, refetch } = useQuery(
    gql`
      query Query($companyId: Int!) {
        company(id: $companyId) {
          name
          id
          streetName
          coordinate
          Clients {
            name
            pcName
            id
          }
        }
      }
    `,
    {
      variables: {
        companyId: parseInt(params.id),
      },
    }
  );

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/settings">Settings</BreadcrumbItem>
        <BreadcrumbItem href="#">Companies</BreadcrumbItem>
        <BreadcrumbItem href={`/settings/companies/${params.id}`}>
          {params.id}
        </BreadcrumbItem>
      </Breadcrumbs>
      <Spacer y={2} />
      <div>
        {!loading ? (
          <div>
            <Hero
              modal={{
                open: heroModal,
                fn: setHeroModal,
              }}
              data={data.company}
              refetch={refetch}
              id={params.id}
            />
            <Spacer y={2} />
            <div className="flex items-center space-x-2 overflow-hidden">
              <p className="text-xl text-default-500 whitespace-nowrap">
                Clients ( {data.company.Clients?.length || 0} )
              </p>
              <Divider />
            </div>
            <Spacer y={2} />
            <div className="space-y-2">
              <div className="ml-auto w-max">
                <Button
                  radius="sm"
                  startContent={<Plus size={24} />}
                  onClick={() => setOpenModal(true)}
                >
                  New
                </Button>
              </div>
              <Clients
                modal={{ openModal, setOpenModal }}
                data={data.company.Clients}
                refetch={refetch}
                id={params.id}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Page;

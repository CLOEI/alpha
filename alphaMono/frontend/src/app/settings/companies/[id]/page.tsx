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
import { Plus } from "lucide-react";
import Clients from "./Clients";
import { useState } from "react";

function Page({ params }: any) {
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
            <h1 className="text-2xl font-bold">
              {data.company.name}{" "}
              <span className="text-sm font-light text-default-500">
                ( id : {data.company.id})
              </span>
            </h1>
            <p className="text-default-500">
              Street name : {data.company.streetName}
            </p>
            <p className="text-default-500">
              Coordinate : {data.company.coordinate}
            </p>
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

"use client";

import { gql, useQuery } from "@apollo/client";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardHeader,
  Divider,
  Spacer,
} from "@nextui-org/react";
import dayjs from "dayjs";

function Page({ params }: any) {
  const { loading, data, refetch } = useQuery(
    gql`
      query Maintenance($maintenanceId: Int!) {
        maintenance(id: $maintenanceId) {
          Company {
            name
            streetName
            coordinate
            id
            Clients {
              name
              pcName
            }
          }
          User {
            username
          }
          createdAt
          type
        }
      }
    `,
    {
      variables: {
        maintenanceId: parseInt(params.id),
      },
    }
  );

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/maintenances">Maintenances</BreadcrumbItem>
        <BreadcrumbItem href={`/maintenances/${params.id}`}>
          {params.id}
        </BreadcrumbItem>
      </Breadcrumbs>
      <Spacer y={2} />
      <div>
        {!loading ? (
          <div>
            <h1 className="text-2xl font-bold">
              {data.maintenance.Company.name}{" "}
              <span className="text-sm font-light text-default-500">
                ( id : {data.maintenance.Company.id})
              </span>
            </h1>
            <p className="text-default-500">
              Street name : {data.maintenance.Company.streetName}
            </p>
            <p className="text-default-500">
              Coordinate : {data.maintenance.Company.coordinate}
            </p>
            <Spacer y={3} />
            <div className="flex items-center space-x-2 overflow-hidden">
              <p className="text-xl text-default-500">User</p>
              <Divider />
            </div>
            <Spacer y={2} />
            <p>Person in charge : {data.maintenance.User.username}</p>
            <p>
              Start time :{" "}
              {dayjs(data.maintenance.createdAt).format(
                "DD/MM/YYYY - HH:mm:ss"
              )}
            </p>
            <Spacer y={2} />
            <div className="flex items-center space-x-2 overflow-hidden">
              <p className="text-xl text-default-500">Clients</p>
              <Divider />
            </div>
            <Spacer y={2} />
            <div className="space-y-2">
              {data.maintenance.Company.Clients.map((c: any, i: number) => {
                return (
                  <Card isPressable className="w-full" key={i}>
                    <CardHeader>
                      <Avatar name={c.name} />
                      <p className="ml-2 text-left">{c.name}</p>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Page;

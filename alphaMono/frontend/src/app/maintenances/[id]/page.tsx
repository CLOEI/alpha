"use client";

import { gql, useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionItem,
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardHeader,
  Divider,
  Spacer,
} from "@nextui-org/react";
import dayjs from "dayjs";
import SignaturePad from "react-signature-pad-wrapper";
import Data from "./Data";

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
              id
              name
              pcName
              Data {
                id
                ch
                pc
                te
                ufp
                ufcj
                ua
                cmc
                ck
                cm
                sa
                rde
                bd
                dh
                pmp
                sea
                md
                mp
                rc
                sr
                signature
                ClientId
                MaintenanceId
              }
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
              {dayjs
                .unix(data.maintenance.createdAt / 1000)
                .format("DD/MM/YYYY - HH:mm")}
            </p>
            <Spacer y={2} />
            <div className="flex items-center space-x-2 overflow-hidden">
              <p className="text-xl text-default-500">Clients</p>
              <Divider />
            </div>
            <Spacer y={2} />
            <Accordion>
              {data.maintenance.Company.Clients.map((c: any, i: number) => {
                return (
                  <AccordionItem
                    key={i}
                    startContent={
                      <Avatar isBordered color="danger" name={c.name} />
                    }
                    title={c.name}
                    subtitle={`${
                      c.Data.length > 0
                        ? Object.values(c.Data[0]).filter((e) => e === true)
                            .length
                        : 0
                    }/19 Checked`}
                  >
                    <Data data={c} mid={params.id} refetch={refetch} />
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Page;

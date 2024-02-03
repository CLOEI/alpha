"use client";

import { gql, useQuery } from "@apollo/client";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
  Input,
} from "@nextui-org/react";
import {
  CircuitBoard,
  Cpu,
  MemoryStick,
  Monitor,
  Pen,
  SmartphoneCharging,
} from "lucide-react";
import Spec from "./Spec";
import Client from "./Client";
import { useState } from "react";

function Page({ params }: any) {
  const [specModal, setSpecModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);
  const { loading, data, refetch } = useQuery(
    gql`
      query Client($clientId: Int!) {
        client(id: $clientId) {
          Spec {
            cpu
            display
            motherboard
            psu
            Remote {
              name
              password
              address
            }
            Printer {
              name
            }
            Memory {
              speed
              size
              name
              ddr
            }
            Mapping {
              name
            }
            Credential {
              name
            }
            case
            dvd
            hdd
            ip
            mac
            monitor
            ssd
            ups
          }
          name
          id
          email
          pcName
          phone
          Company {
            name
          }
          adminPCPassword
          localPCPassword
        }
      }
    `,
    {
      variables: {
        clientId: parseInt(params.cid),
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
        <BreadcrumbItem href="#">Client</BreadcrumbItem>
        <BreadcrumbItem href={`/settings/companies/${params.id}`}>
          {params.cid}
        </BreadcrumbItem>
      </Breadcrumbs>
      <Spacer y={2} />
      <div>
        {!loading && data ? (
          <div>
            <Client
              modal={{
                open: clientModal,
                fn: setClientModal,
              }}
              data={data.client}
              refetch={refetch}
              id={params.cid}
            />
            <Spacer y={2} />
            <div className="flex items-center space-x-2 overflow-hidden">
              <div className="flex items-center gap-2">
                <p className="text-xl text-default-500 whitespace-nowrap">
                  Computer spec
                </p>
                <Button isIconOnly size="sm" onClick={() => setSpecModal(true)}>
                  <Pen />
                </Button>
              </div>
              <Divider />
            </div>
            <Spacer y={2} />
            <Spec
              modal={{
                open: specModal,
                fn: setSpecModal,
              }}
              data={data.client.Spec}
              refetch={refetch}
              id={params.cid}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Page;

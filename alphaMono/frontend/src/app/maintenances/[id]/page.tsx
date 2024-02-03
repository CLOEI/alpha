"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
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
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import dayjs from "dayjs";
import Data from "./Data";
import { Pencil } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState } from "react";

const formSchema = z.object({
  note: z.string().optional(),
});

function Page({ params }: any) {
  const [updateNote] = useMutation(gql`
    mutation UpdateNote($updateNoteId: Int!, $note: String!) {
      updateNote(id: $updateNoteId, note: $note) {
        id
      }
    }
  `);
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
          note
        }
      }
    `,
    {
      variables: {
        maintenanceId: parseInt(params.id),
      },
    }
  );
  const [openModal, setOpenModal] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: data?.maintenance.note || "",
    },
  });

  const onSubmit = async (form: z.infer<typeof formSchema>) => {
    toast.promise(
      updateNote({
        variables: {
          updateNoteId: parseInt(params.id),
          ...form,
        },
      }),
      {
        loading: "Updating note...",
        success: () => {
          refetch();
          setOpenModal(false);
          return "Note updated successfully";
        },
        error: (err) => {
          return err.message;
        },
      },
      {
        style: {
          background: "#18181b",
          color: "#fff",
        },
      }
    );
  };

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
            <div>
              <p className="text-default-500">
                Note: {data.maintenance.note || "-"}
              </p>
              <Button
                isIconOnly
                size="sm"
                className="flex ml-auto"
                onClick={() => setOpenModal(true)}
              >
                <Pencil />
              </Button>
            </div>
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
                    <Data
                      data={c}
                      mid={params.id}
                      refetch={refetch}
                      loading={loading}
                    />
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        ) : null}
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add Mapping</ModalHeader>
              <ModalBody>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-2">
                    <div>
                      <Textarea
                        type="text"
                        label="Note"
                        placeholder="Note..."
                        isRequired
                        isInvalid={!!form.formState.errors.note}
                        errorMessage={form.formState.errors.note?.message}
                        {...form.register("note")}
                      />
                    </div>
                    <div>
                      <Button
                        type="submit"
                        className="ml-auto block"
                        color="success"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Page;

"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Skeleton,
  Spacer,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Plus, SlidersHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import * as z from "zod";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import Companies from "./Companies";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Company is required",
  }),
  type: z.string().min(1, {
    message: "Type is required",
  }),
  startAt: z.string().min(1, {
    message: "Start time is required",
  }),
});

function Page() {
  const router = useRouter();
  const { loading, data, error, refetch } = useQuery(gql`
    query Query {
      companies {
        Clients {
          name
          id
        }
        id
        coordinate
        name
        owner
        streetName
      }
      users {
        id
        username
        createdAt
        Maintenances {
          createdAt
          Company {
            name
          }
          type
          id
        }
        role
      }
    }
  `);
  const [addUser] = useMutation(gql`
    mutation AddUser($username: String!, $password: String!, $role: String!) {
      addUser(username: $username, password: $password, role: $role) {
        id
      }
    }
  `);

  const [removeUser] = useMutation(gql`
    mutation RemoveUser($id: Int!) {
      removeUser(id: $id) {
        id
      }
    }
  `);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      type: "",
      startAt: "",
    },
  });

  const getColor = (type: string) => {
    switch (type) {
      case "Emergency":
        return "danger";
      case "ETC":
        return "warning";
      case "Routine":
        return "success";
      default:
        return "primary";
    }
  };

  const onSubmit = async (form: z.infer<typeof formSchema>) => {
    toast.promise(
      addMaintenance({
        variables: {
          type: form.type,
          companyId: data.companies.find((c: any) => c.name === form.company)
            .id,
        },
      }),
      {
        loading: "Adding new task...",
        success: () => {
          refetch();
          return "Task added successfully";
        },
        error: (err) => {
          console.log(err);
          return "error";
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
        <BreadcrumbItem href="/settings">Settings</BreadcrumbItem>
      </Breadcrumbs>
      <Spacer y={2} />
      <div>
        {!loading && (
          <Tabs aria-label="Options">
            <Tab key="users" title="Users">
              <div className="space-y-2">
                <div className="ml-auto w-max">
                  <Button
                    radius="sm"
                    startContent={<Plus size={24} />}
                    isDisabled
                  >
                    New
                  </Button>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  {data.users.map((user: any, i: number) => {
                    return (
                      <Card key={i} isPressable className="w-full" as="div">
                        <CardHeader className="flex gap-3">
                          <Avatar name={user.username} />
                          <div className="text-left flex flex-1 justify-between">
                            <div>
                              <p className="text-md">{user.username}</p>
                              <p className="text-sm text-default-500">
                                {user.role} -{" "}
                                {dayjs(user.createdAt).format("DD/MM/YYYY")}
                              </p>
                            </div>
                            <Button
                              color="danger"
                              onClick={() => {
                                removeUser({
                                  variables: {
                                    id: user.id,
                                  },
                                });
                                refetch();
                              }}
                            >
                              <Trash size={24} />
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </Tab>
            <Tab key="companies" title="Companies">
              <Companies data={data.companies} refetch={refetch} />
            </Tab>
          </Tabs>
        )}
      </div>
    </div>
  );
}

export default Page;

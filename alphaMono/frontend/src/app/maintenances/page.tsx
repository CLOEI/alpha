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
} from "@nextui-org/react";
import { Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import * as z from "zod";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  company: z.string().min(1, {
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
  const [openModal, setOpenModal] = useState(false);
  const { loading, data, refetch } = useQuery(gql`
    query Maintenances {
      maintenances {
        createdAt
        id
        type
        User {
          username
        }
        Company {
          name
        }
      }
      companies {
        name
        id
      }
    }
  `);
  const [addMaintenance] = useMutation(gql`
    mutation AddMaintenance($type: String!, $companyId: Int!) {
      addMaintenance(type: $type, CompanyId: $companyId) {
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
      </Breadcrumbs>
      <Spacer y={2} />
      <div className="w-max ml-auto space-x-1">
        <Button radius="sm" isIconOnly variant="bordered">
          <SlidersHorizontal />
        </Button>
        <Button
          onClick={() => setOpenModal(true)}
          radius="sm"
          startContent={<Plus size={24} />}
        >
          New
        </Button>
      </div>
      <Spacer y={2} />
      <div className="space-y-2">
        {!loading ? (
          <>
            {data.maintenances.map((m: any, i: number) => {
              return (
                <Card
                  isPressable
                  className="w-full"
                  key={i}
                  onClick={() => router.push(`/maintenances/${m.id}`)}
                >
                  <CardHeader className="flex gap-3">
                    <Avatar name={m.Company.name} />
                    <div className="text-left">
                      <p className="text-md">{m.Company.name}</p>
                      <p className="text-sm text-default-500">
                        {m.User.username}
                      </p>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Chip color={getColor(m.type)}>{m.type}</Chip>
                    <p className="text-default-500">
                      {dayjs(m.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </CardFooter>
                </Card>
              );
            })}
          </>
        ) : (
          <>
            <Skeleton className="w-full h-[120px] rounded-lg" />
            <Skeleton className="w-full h-[120px] rounded-lg" />
            <Skeleton className="w-full h-[120px] rounded-lg" />
            <Skeleton className="w-full h-[120px] rounded-lg" />
          </>
        )}
        {data?.maintenances.length === 0 && !loading && (
          <div className="text-center py-40">
            <p className="text-5xl">＼(ﾟｰﾟ＼)</p>
            <p className="text-default-500">No maintenance found</p>
          </div>
        )}
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add new task</ModalHeader>
              <ModalBody>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Autocomplete
                    defaultItems={data.companies}
                    label="Company"
                    placeholder="PT. XYZ"
                    {...form.register("company")}
                  >
                    {(company: any) => {
                      return (
                        <AutocompleteItem key={company.id}>
                          {company.name}
                        </AutocompleteItem>
                      );
                    }}
                  </Autocomplete>
                  <Spacer y={1} />
                  <Autocomplete label="Type" {...form.register("type")}>
                    {["Emergency", "ETC", "Routine", "Teamviewer"].map(
                      (type, i) => {
                        return (
                          <AutocompleteItem key={i}>{type}</AutocompleteItem>
                        );
                      }
                    )}
                  </Autocomplete>
                  <Spacer y={1} />
                  <Input
                    type="time"
                    label="Start at"
                    isInvalid={!!form.formState.errors.startAt}
                    errorMessage={form.formState.errors.startAt?.message}
                    {...form.register("startAt")}
                  />
                  <Spacer y={2} />
                  <Button
                    type="submit"
                    className="ml-auto block"
                    color="success"
                  >
                    Add
                  </Button>
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

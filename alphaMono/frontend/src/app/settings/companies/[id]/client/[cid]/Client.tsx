import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
} from "@nextui-org/react";
import {
  CircuitBoard,
  Cpu,
  MemoryStick,
  Monitor,
  Pen,
  SmartphoneCharging,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  pcName: z.string().optional(),
  localPCPassword: z.string().optional(),
  adminPCPassword: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

function Client({ modal: { open, fn }, data, refetch, id }: any) {
  const [updateClient] = useMutation(gql`
    mutation UpdateClient(
      $updateClientId: Int!
      $pcName: String
      $localPcPassword: String
      $adminPcPassword: String
      $phone: String
      $email: String
    ) {
      updateClient(
        id: $updateClientId
        pcName: $pcName
        localPCPassword: $localPcPassword
        adminPCPassword: $adminPcPassword
        phone: $phone
        email: $email
      )
    }
  `);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pcName: data.pcName || "",
      localPCPassword: data.pcPassword || "",
      adminPCPassword: data.adminPCPassword || "",
      phone: data.phone || "",
      email: data.email || "",
    },
  });

  const onSubmit = async (form: z.infer<typeof formSchema>) => {
    toast.promise(
      updateClient({
        variables: {
          updateClientId: parseInt(id),
          pcName: form.pcName,
          localPcPassword: form.localPCPassword,
          adminPcPassword: form.adminPCPassword,
          phone: form.phone,
          email: form.email,
        },
      }),
      {
        loading: "Updating client...",
        success: () => {
          refetch();
          fn(false);
          return "Client updated successfully";
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
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {data.name}{" "}
          <span className="text-sm font-light text-default-500">
            ( id : {data.id})
          </span>
        </h1>
        <Button isIconOnly size="sm" onClick={() => fn(true)}>
          <Pen />
        </Button>
      </div>
      <p className="text-default-500">Company : {data.Company.name}</p>
      <p className="text-default-500">PC Name : {data.pcName}</p>
      <p className="text-default-500">
        Local PC Password : {data.localPCPassword}
      </p>
      <p className="text-default-500">
        Admin PC Password : {data.adminPCPassword}
      </p>
      <p className="text-default-500">Phone number : {data.phone}</p>
      <p className="text-default-500">Email : {data.email}</p>
      <Modal isOpen={open} onClose={() => fn(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Update Specification</ModalHeader>
              <ModalBody>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Input
                    type="text"
                    label="PC Name"
                    defaultValue={data.pcName || ""}
                    isInvalid={!!form.formState.errors.pcName}
                    errorMessage={form.formState.errors.pcName?.message}
                    {...form.register("pcName")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Local PC Password"
                    defaultValue={data.localPCPassword || ""}
                    isInvalid={!!form.formState.errors.localPCPassword}
                    errorMessage={
                      form.formState.errors.localPCPassword?.message
                    }
                    {...form.register("localPCPassword")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Admin PC Password"
                    defaultValue={data.adminPCPassword || ""}
                    isInvalid={!!form.formState.errors.adminPCPassword}
                    errorMessage={
                      form.formState.errors.adminPCPassword?.message
                    }
                    {...form.register("adminPCPassword")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Phone number"
                    defaultValue={data.phone || ""}
                    isInvalid={!!form.formState.errors.phone}
                    errorMessage={form.formState.errors.phone?.message}
                    {...form.register("phone")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Email"
                    defaultValue={data.email || ""}
                    isInvalid={!!form.formState.errors.email}
                    errorMessage={form.formState.errors.email?.message}
                    {...form.register("email")}
                  />
                  <Spacer y={2} />
                  <Button
                    type="submit"
                    className="ml-auto block"
                    color="success"
                  >
                    Update
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Client;

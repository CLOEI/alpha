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
  name: z.string().min(3, "Name must be at least 3 characters"),
  streetName: z.string().optional(),
  coordinate: z.string().optional(),
});

function Hero({ modal: { open, fn }, data, refetch, id }: any) {
  const [updateCompany] = useMutation(gql`
    mutation UpdateCompany(
      $updateCompanyId: Int!
      $name: String
      $streetName: String
      $coordinate: String
    ) {
      updateCompany(
        id: $updateCompanyId
        name: $name
        streetName: $streetName
        coordinate: $coordinate
      )
    }
  `);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name || "",
      streetName: data.streetName || "",
      coordinate: data.coordinate || "",
    },
  });

  const onSubmit = async (form: z.infer<typeof formSchema>) => {
    toast.promise(
      updateCompany({
        variables: {
          updateCompanyId: parseInt(id),
          name: form.name,
          streetName: form.streetName,
          coordinate: form.coordinate,
        },
      }),
      {
        loading: "Updating company...",
        success: () => {
          refetch();
          fn(false);
          return "Company updated successfully";
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
      <div className="flex justify-between items-center">
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
      <p className="text-default-500">Street name : {data.streetName}</p>
      <p className="text-default-500">Coordinate : {data.coordinate}</p>
      <Modal isOpen={open} onClose={() => fn(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Update Company</ModalHeader>
              <ModalBody>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Input
                    type="text"
                    label="Name"
                    isInvalid={!!form.formState.errors.name}
                    errorMessage={form.formState.errors.name?.message}
                    {...form.register("name")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Street name"
                    isInvalid={!!form.formState.errors.streetName}
                    errorMessage={form.formState.errors.streetName?.message}
                    {...form.register("streetName")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Coordinate"
                    isInvalid={!!form.formState.errors.coordinate}
                    errorMessage={form.formState.errors.coordinate?.message}
                    {...form.register("coordinate")}
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

export default Hero;

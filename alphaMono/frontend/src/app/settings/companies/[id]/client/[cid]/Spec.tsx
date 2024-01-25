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
  SmartphoneCharging,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  cpu: z.string().optional(),
  display: z.string().optional(),
  ram: z.string().optional(),
  psu: z.string().optional(),
  motherboard: z.string().optional(),
});

function Spec({ modal: { open, fn }, data, refetch, id }: any) {
  const [updateSpec] = useMutation(gql`
    mutation UpdateSpec(
      $clientId: Int!
      $cpu: String
      $ram: String
      $display: String
      $psu: String
      $motherboard: String
    ) {
      updateSpec(
        clientId: $clientId
        cpu: $cpu
        ram: $ram
        display: $display
        psu: $psu
        motherboard: $motherboard
      )
    }
  `);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpu: data?.cpu || "",
      display: data?.display || "",
      ram: data?.ram || "",
      psu: data?.psu || "",
      motherboard: data?.motherboard || "",
    },
  });

  const onSubmit = async (form: z.infer<typeof formSchema>) => {
    toast.promise(
      updateSpec({
        variables: {
          clientId: parseInt(id),
          cpu: form.cpu,
          ram: form.ram,
          display: form.display,
          psu: form.psu,
          motherboard: form.motherboard,
        },
      }),
      {
        loading: "Updating spec...",
        success: () => {
          refetch();
          fn(false);
          return "Spec updated successfully";
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
      <div className="space-y-1 text-default-500">
        <div className="flex gap-2">
          <Cpu />
          <p>CPU: {data?.cpu || "-"}</p>
        </div>
        <div className="flex gap-2">
          <Monitor />
          <p>Display: {data?.display || "-"}</p>
        </div>
        <div className="flex gap-2">
          <MemoryStick />
          <p>RAM: {data?.ram || "-"}</p>
        </div>
        <div className="flex gap-2">
          <SmartphoneCharging />
          <p>PSU: {data?.psu || "-"}</p>
        </div>
        <div className="flex gap-2">
          <CircuitBoard />
          <p>Motherboard: {data?.motherboard || "-"}</p>
        </div>
      </div>
      <Modal isOpen={open} onClose={() => fn(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Update Specification</ModalHeader>
              <ModalBody>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Input
                    type="text"
                    label="CPU"
                    isInvalid={!!form.formState.errors.cpu}
                    errorMessage={form.formState.errors.cpu?.message}
                    {...form.register("cpu")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Display"
                    isInvalid={!!form.formState.errors.display}
                    errorMessage={form.formState.errors.display?.message}
                    {...form.register("display")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="RAM"
                    isInvalid={!!form.formState.errors.ram}
                    errorMessage={form.formState.errors.ram?.message}
                    {...form.register("ram")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="PSU"
                    isInvalid={!!form.formState.errors.psu}
                    errorMessage={form.formState.errors.psu?.message}
                    {...form.register("psu")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Motherboard"
                    isInvalid={!!form.formState.errors.motherboard}
                    errorMessage={form.formState.errors.motherboard?.message}
                    {...form.register("motherboard")}
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

export default Spec;

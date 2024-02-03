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
  CreditCard,
  DiscAlbum,
  HardDrive,
  HardDriveDownload,
  Info,
  MemoryStick,
  Monitor,
  MonitorUp,
  PcCase,
  Plus,
  Printer,
  SmartphoneCharging,
  ToyBrick,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  ip: z.string().optional(),
  mac: z.string().optional(),
  cpu: z.string().optional(),
  display: z.string().optional(),
  hdd: z.string().optional(),
  ssd: z.string().optional(),
  dvd: z.string().optional(),
  case: z.string().optional(),
  monitor: z.string().optional(),
  ups: z.string().optional(),
  psu: z.string().optional(),
  motherboard: z.string().optional(),
});

function Spec({ modal: { open, fn }, data, refetch, id }: any) {
  const [updateSpec] = useMutation(gql`
    mutation UpdateSpec($data: SpecInput) {
      updateSpec(data: $data)
    }
  `);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ip: data?.ip || "",
      mac: data?.mac || "",
      cpu: data?.cpu || "",
      display: data?.display || "",
      hdd: data?.hdd || "",
      ssd: data?.ssd || "",
      dvd: data?.dvd || "",
      case: data?.case || "",
      monitor: data?.monitor || "",
      ups: data?.ups || "",
      psu: data?.psu || "",
      motherboard: data?.motherboard || "",
    },
  });

  const onSubmit = async (form: z.infer<typeof formSchema>) => {
    toast.promise(
      updateSpec({
        variables: {
          data: {
            ClientId: parseInt(id),
            ...form,
          },
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
          <Info />
          <p>IP: {data?.ip || "-"}</p>
        </div>
        <div className="flex gap-2">
          <Info />
          <p>MAC: {data?.mac || "-"}</p>
        </div>
        <div className="flex gap-2">
          <Cpu />
          <p>CPU: {data?.cpu || "-"}</p>
        </div>
        <div className="flex gap-2">
          <Monitor />
          <p>Display: {data?.display || "-"}</p>
        </div>
        <div className="flex gap-2">
          <HardDrive />
          <p>HDD: {data?.hdd || "-"}</p>
        </div>
        <div className="flex gap-2">
          <HardDrive />
          <p>SSD: {data?.ssd || "-"}</p>
        </div>
        <div className="flex gap-2">
          <DiscAlbum />
          <p>DVD: {data?.dvd || "-"}</p>
        </div>
        <div className="flex gap-2">
          <PcCase />
          <p>Case: {data?.case || "-"}</p>
        </div>
        <div className="flex gap-2">
          <Monitor />
          <p>Monitor: {data?.monitor || "-"}</p>
        </div>
        <div className="flex gap-2">
          <ToyBrick />
          <p>UPS: {data?.ups || "-"}</p>
        </div>
        <div className="flex gap-2">
          <SmartphoneCharging />
          <p>PSU: {data?.psu || "-"}</p>
        </div>
        <div className="flex gap-2">
          <CircuitBoard />
          <p>Motherboard: {data?.motherboard || "-"}</p>
        </div>
        <div className="flex gap-2 items-center">
          <CreditCard />
          <p>Credentials: </p>
          <div>
            <Button radius="sm" startContent={<Plus />}>
              Add
            </Button>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <MonitorUp />
          <p>Remotes: </p>
          <div>
            <Button radius="sm" startContent={<Plus />}>
              Add
            </Button>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <HardDriveDownload />
          <p>Mapping: </p>
          <div>
            <Button radius="sm" startContent={<Plus />}>
              Add
            </Button>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Printer />
          <p>Printer: </p>
          <div>
            <Button radius="sm" startContent={<Plus />}>
              Add
            </Button>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <MemoryStick />
          <p>RAM: </p>
          <div>
            <Button radius="sm" startContent={<Plus />}>
              Add
            </Button>
          </div>
        </div>
        <Spacer y={2} />
      </div>
      <Modal
        isOpen={open}
        onClose={() => fn(false)}
        scrollBehavior="inside"
        placement="bottom-center"
        size="4xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Update Specification</ModalHeader>
              <ModalBody>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Input
                    type="text"
                    label="IP"
                    defaultValue={data?.ip || ""}
                    isInvalid={!!form.formState.errors.ip}
                    errorMessage={form.formState.errors.ip?.message}
                    {...form.register("ip")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="MAC"
                    defaultValue={data?.mac || ""}
                    isInvalid={!!form.formState.errors.mac}
                    errorMessage={form.formState.errors.mac?.message}
                    {...form.register("mac")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="CPU"
                    defaultValue={data?.cpu || ""}
                    isInvalid={!!form.formState.errors.cpu}
                    errorMessage={form.formState.errors.cpu?.message}
                    {...form.register("cpu")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Display"
                    defaultValue={data?.display || ""}
                    isInvalid={!!form.formState.errors.display}
                    errorMessage={form.formState.errors.display?.message}
                    {...form.register("display")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="HDD"
                    defaultValue={data?.hdd || ""}
                    isInvalid={!!form.formState.errors.hdd}
                    errorMessage={form.formState.errors.hdd?.message}
                    {...form.register("hdd")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="SSD"
                    defaultValue={data?.ssd || ""}
                    isInvalid={!!form.formState.errors.ssd}
                    errorMessage={form.formState.errors.ssd?.message}
                    {...form.register("ssd")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="DVD"
                    defaultValue={data?.dvd || ""}
                    isInvalid={!!form.formState.errors.dvd}
                    errorMessage={form.formState.errors.dvd?.message}
                    {...form.register("dvd")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Case"
                    defaultValue={data?.case || ""}
                    isInvalid={!!form.formState.errors.case}
                    errorMessage={form.formState.errors.case?.message}
                    {...form.register("case")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Monitor"
                    defaultValue={data?.monitor || ""}
                    isInvalid={!!form.formState.errors.monitor}
                    errorMessage={form.formState.errors.monitor?.message}
                    {...form.register("monitor")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="UPS"
                    defaultValue={data?.ups || ""}
                    isInvalid={!!form.formState.errors.ups}
                    errorMessage={form.formState.errors.ups?.message}
                    {...form.register("ups")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="PSU"
                    defaultValue={data?.psu || ""}
                    isInvalid={!!form.formState.errors.psu}
                    errorMessage={form.formState.errors.psu?.message}
                    {...form.register("psu")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Motherboard"
                    defaultValue={data?.motherboard || ""}
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

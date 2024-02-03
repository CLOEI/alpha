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
  HardDriveDownload,
  MemoryStick,
  Plus,
  PrinterIcon,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  ddr: z.string({
    required_error: "DDR is required",
  }),
  size: z.string({
    required_error: "Size is required",
  }),
  speed: z.string({
    required_error: "Speed is required",
  }),
});

function Credentials({ data, refetch, id }: any) {
  const [addMapping] = useMutation(gql`
    mutation AddMemory(
      $specClientId: Int!
      $name: String!
      $speed: String!
      $size: String!
      $ddr: String!
    ) {
      addMemory(
        SpecClientID: $specClientId
        name: $name
        speed: $speed
        size: $size
        ddr: $ddr
      ) {
        ddr
        name
        size
        speed
      }
    }
  `);
  const [openModal, setOpenModal] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ddr: "",
      size: "",
      speed: "",
    },
  });

  const onSubmit = async (form: z.infer<typeof formSchema>) => {
    toast.promise(
      addMapping({
        variables: {
          specClientId: parseInt(id),
          ...form,
        },
      }),
      {
        loading: "Adding memory...",
        success: () => {
          refetch();
          setOpenModal(false);
          return "Memory added successfully";
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
      <div className="flex gap-2 items-start space-x-5">
        <div className="flex gap-2">
          <MemoryStick />
          <p>RAM: </p>
        </div>
        <div>
          <ul className="list-disc">
            {data?.length > 0 &&
              data.map((d: any) => (
                <li key={d.id}>
                  {d.size}x{d.ddr}-{d.name},{d.speed}
                </li>
              ))}
          </ul>
          <Button
            radius="sm"
            startContent={<Plus />}
            onClick={() => setOpenModal(true)}
          >
            Add
          </Button>
        </div>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add Memory</ModalHeader>
              <ModalBody>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-2">
                    <div>
                      <Input
                        type="text"
                        label="Name"
                        isRequired
                        isInvalid={!!form.formState.errors.name}
                        errorMessage={form.formState.errors.name?.message}
                        {...form.register("name")}
                      />
                      <Spacer y={1} />
                      <Input
                        type="text"
                        label="DDR"
                        isRequired
                        isInvalid={!!form.formState.errors.ddr}
                        errorMessage={form.formState.errors.ddr?.message}
                        {...form.register("ddr")}
                      />
                      <Spacer y={1} />
                      <Input
                        type="text"
                        label="Size"
                        isRequired
                        isInvalid={!!form.formState.errors.size}
                        errorMessage={form.formState.errors.size?.message}
                        {...form.register("size")}
                      />
                      <Spacer y={1} />
                      <Input
                        type="text"
                        label="Speed"
                        isRequired
                        isInvalid={!!form.formState.errors.speed}
                        errorMessage={form.formState.errors.speed?.message}
                        {...form.register("speed")}
                      />
                    </div>
                    <div>
                      <Button
                        type="submit"
                        className="ml-auto block"
                        color="success"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Credentials;

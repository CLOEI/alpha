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
import { CreditCard, MonitorUp, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  address: z.string({
    required_error: "Address is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});

function Remotes({ data, refetch, id }: any) {
  const [addRemote] = useMutation(gql`
    mutation AddRemote(
      $specClientId: Int!
      $name: String!
      $address: String!
      $password: String!
    ) {
      addRemote(
        SpecClientID: $specClientId
        name: $name
        address: $address
        password: $password
      ) {
        address
        name
        password
      }
    }
  `);
  const [openModal, setOpenModal] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      password: "",
    },
  });

  const onSubmit = async (form: z.infer<typeof formSchema>) => {
    toast.promise(
      addRemote({
        variables: {
          specClientId: parseInt(id),
          ...form,
        },
      }),
      {
        loading: "Adding remote...",
        success: () => {
          refetch();
          setOpenModal(false);
          return "Remote added successfully";
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
          <MonitorUp />
          <p>Remotes: </p>
        </div>
        <div>
          <ul className="list-disc">
            {data?.length > 0 &&
              data.map((d: any) => (
                <li key={d.id}>
                  ({d.address}:{d.password}) {d.name}
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
              <ModalHeader>Add Remotes</ModalHeader>
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
                        label="Address"
                        isRequired
                        isInvalid={!!form.formState.errors.address}
                        errorMessage={form.formState.errors.address?.message}
                        {...form.register("address")}
                      />
                      <Spacer y={1} />
                      <Input
                        type="text"
                        label="Password"
                        isRequired
                        isInvalid={!!form.formState.errors.password}
                        errorMessage={form.formState.errors.password?.message}
                        {...form.register("password")}
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

export default Remotes;

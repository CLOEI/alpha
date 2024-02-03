import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Card,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
  Input,
  Button,
} from "@nextui-org/react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as z from "zod";

type Params = {
  modal: {
    openModal: boolean;
    setOpenModal: (x: boolean) => void;
  };
  data: any;
  refetch: any;
  id: string;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Company is required",
  }),
  role: z.string().min(1, {
    message: "Street name is required",
  }),
  pcName: z.string().min(1, {
    message: "Coordinate is required",
  }),
  phone: z.string().optional(),
  email: z.string().optional(),
  birthday: z.string().optional(),
});

function Clients({
  modal: { openModal, setOpenModal },
  data,
  refetch,
  id,
}: Params) {
  const router = useRouter();
  const [addClient] = useMutation(gql`
    mutation AddClient(
      $name: String!
      $role: String!
      $companyId: Int!
      $pcName: String!
      $phone: String
      $email: String
      $birthday: String
    ) {
      addClient(
        name: $name
        role: $role
        companyId: $companyId
        pcName: $pcName
        phone: $phone
        email: $email
        birthday: $birthday
      ) {
        id
      }
    }
  `);
  const [removeClient] = useMutation(gql`
    mutation RemoveClient($removeClientId: Int!) {
      removeClient(id: $removeClientId)
    }
  `);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      pcName: "",
      phone: "",
      email: "",
      birthday: "",
    },
  });

  const onSubmit = async (form: z.infer<typeof formSchema>) => {
    toast.promise(
      addClient({
        variables: {
          name: form.name,
          role: form.role,
          companyId: parseInt(id),
          pcName: form.pcName,
          phone: form.phone,
          email: form.email,
          birthday: form.birthday,
        },
      }),
      {
        loading: "Adding new client...",
        success: () => {
          refetch();
          setOpenModal(false);
          return "Client added successfully";
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
      <div className="space-y-2">
        {data ? (
          <>
            {data.map((c: any, i: number) => {
              return (
                <Card
                  isPressable
                  className="w-full"
                  key={i}
                  as="div"
                  onClick={() =>
                    router.push(`/settings/companies/${id}/client/${c.id}`)
                  }
                >
                  <CardHeader>
                    <Avatar isBordered name={c.name} />
                    <div className="flex flex-1 items-center justify-between">
                      <p className="ml-2 text-left">{c.name}</p>
                      <Button
                        color="danger"
                        onClick={() => {
                          removeClient({
                            variables: {
                              removeClientId: parseInt(c.id),
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
          </>
        ) : (
          <div className="text-center py-40">
            <p className="text-5xl">(˃̣̣̥⌓˂̣̣̥ )</p>
            <p className="text-default-500 mt-4">No clients found</p>
          </div>
        )}
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add client</ModalHeader>
              <ModalBody>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Input
                    type="text"
                    label="Name"
                    isInvalid={!!form.formState.errors.name}
                    errorMessage={form.formState.errors.name?.message}
                    isRequired
                    {...form.register("name")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Role"
                    isInvalid={!!form.formState.errors.role}
                    errorMessage={form.formState.errors.role?.message}
                    isRequired
                    {...form.register("role")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="PC Name"
                    isInvalid={!!form.formState.errors.pcName}
                    errorMessage={form.formState.errors.pcName?.message}
                    isRequired
                    {...form.register("pcName")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Phone number"
                    isInvalid={!!form.formState.errors.phone}
                    errorMessage={form.formState.errors.phone?.message}
                    {...form.register("phone")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Email"
                    isInvalid={!!form.formState.errors.email}
                    errorMessage={form.formState.errors.email?.message}
                    {...form.register("email")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Birthday"
                    isInvalid={!!form.formState.errors.birthday}
                    errorMessage={form.formState.errors.birthday?.message}
                    {...form.register("birthday")}
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
    </>
  );
}

export default Clients;

import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
  Input,
} from "@nextui-org/react";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Company is required",
  }),
  streetName: z.string().min(1, {
    message: "Street name is required",
  }),
  coordinate: z.string().min(1, {
    message: "Coordinate is required",
  }),
});

function Companies({ data, refetch }: any) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [addCompany] = useMutation(gql`
    mutation AddCompany(
      $name: String!
      $streetName: String!
      $coordinate: String!
    ) {
      addCompany(
        name: $name
        streetName: $streetName
        coordinate: $coordinate
      ) {
        id
      }
    }
  `);
  const [removeCompany] = useMutation(gql`
    mutation RemoveCompany($removeCompanyId: Int!) {
      removeCompany(id: $removeCompanyId)
    }
  `);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      streetName: "",
      coordinate: "",
    },
  });

  const onSubmit = async (form: z.infer<typeof formSchema>) => {
    toast.promise(
      addCompany({
        variables: {
          name: form.name,
          streetName: form.streetName,
          coordinate: form.coordinate,
        },
      }),
      {
        loading: "Adding new company...",
        success: () => {
          refetch();
          setOpenModal(false);
          return "Company added successfully";
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
        <div className="ml-auto w-max">
          <Button
            radius="sm"
            startContent={<Plus size={24} />}
            onClick={() => setOpenModal(true)}
          >
            New
          </Button>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {data.map((company: any, i: number) => {
            return (
              <Card
                key={i}
                isPressable
                className="w-full"
                onClick={() => router.push(`/settings/companies/${company.id}`)}
              >
                <CardHeader className="flex gap-3">
                  <Avatar name={company.name} />
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-md text-left">{company.name}</p>
                    {/* <Button
                      color="danger"
                      onClick={() => removeCompany(company.id)}
                    >
                      <Trash size={24} />
                    </Button> */}
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add company</ModalHeader>
              <ModalBody>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    label="Street name"
                    isRequired
                    isInvalid={!!form.formState.errors.streetName}
                    errorMessage={form.formState.errors.streetName?.message}
                    {...form.register("streetName")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="text"
                    label="Coordinate"
                    isRequired
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

export default Companies;

import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { HardDriveDownload, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
});

function Credentials({ data, refetch, id }: any) {
  const [addMapping] = useMutation(gql`
    mutation AddMapping($specClientId: Int!, $name: String!) {
      addMapping(SpecClientID: $specClientId, name: $name) {
        name
      }
    }
  `);
  const [openModal, setOpenModal] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
        loading: "Adding mapping...",
        success: () => {
          refetch();
          setOpenModal(false);
          return "Mapping added successfully";
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
          <HardDriveDownload />
          <p>Mapping: </p>
        </div>
        <div>
          <ul className="list-disc">
            {data?.length > 0 &&
              data.map((d: any) => <li key={d.id}>{d.name}</li>)}
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
              <ModalHeader>Add Mapping</ModalHeader>
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

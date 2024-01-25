"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import { Construction, Factory, Settings, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { useRouter } from "next/navigation";

import { gql, useMutation, useQuery } from "@apollo/client";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { data, refetch } = useQuery(gql`
    query Query {
      verified
    }
  `);
  const [login] = useMutation(gql`
    mutation Query($username: String!, $password: String!) {
      login(username: $username, password: $password)
    }
  `);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigateTo = (path: string) => {
    if (data?.verified == null || data?.verified == false) {
      setOpenModal(true);
    } else {
      router.push(path);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    toast.promise(
      login({
        variables: {
          username: data.username,
          password: data.password,
        },
      }),
      {
        loading: "Logging in...",
        success: (data: any) => {
          if (data.data.login) {
            localStorage.setItem("token", data.data.login);
            setOpenModal(false);
            refetch();
            return "Logged in!";
          } else {
            form.setError("username", {
              message: "Username or password is incorrect!",
            });
            throw "Username or password is incorrect!";
          }
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
      <div className="flex h-screen justify-center items-center">
        <div className="space-x-2">
          <Tooltip showArrow content="Users">
            <Button
              isIconOnly
              isDisabled
              onClick={() => navigateTo("/users")}
              aria-label="Users"
              radius="sm"
              size="lg"
            >
              <User size={36} />
            </Button>
          </Tooltip>
          <Tooltip showArrow content="Maintenances">
            <Button
              isIconOnly
              onClick={() => navigateTo("/maintenances")}
              aria-label="Maintenances"
              radius="sm"
              size="lg"
            >
              <Construction size={36} />
            </Button>
          </Tooltip>
          <Tooltip showArrow content="Settings">
            <Button
              isIconOnly
              onClick={() => navigateTo("/settings")}
              aria-label="Settings"
              radius="sm"
              size="lg"
            >
              <Settings size={36} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Authorization needed!</ModalHeader>
              <ModalBody>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Input
                    type="text"
                    label="Username"
                    isInvalid={!!form.formState.errors.username}
                    errorMessage={form.formState.errors.username?.message}
                    {...form.register("username")}
                  />
                  <Spacer y={1} />
                  <Input
                    type="password"
                    label="Password"
                    isInvalid={!!form.formState.errors.password}
                    errorMessage={form.formState.errors.password?.message}
                    {...form.register("password")}
                  />
                  <Spacer y={2} />
                  <Button
                    type="submit"
                    className="ml-auto block"
                    color="success"
                  >
                    Login
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

import { gql, useMutation } from "@apollo/client";
import {
  AccordionItem,
  Avatar,
  Button,
  Spacer,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { sign } from "crypto";
import React, { useEffect, useRef, useState } from "react";
import SignaturePad from "react-signature-pad-wrapper";

const DATA = [
  "CH",
  "PC",
  "TE",
  "UFP",
  "UFCJ",
  "UA",
  "CMC",
  "CK",
  "CM",
  "SA",
  "RDE",
  "BD",
  "DH",
  "PMP",
  "SEA",
  "MD",
  "MP",
  "RC",
  "SR",
];

function Data({ data, mid, refetch }: any) {
  const signaturePad = useRef<SignaturePad>(null);
  const [check, setCheck] = useState(() => {
    if (data.Data.length > 0) {
      const { __typename, signature, ClientId, MaintenanceId, ...rest } =
        data.Data[0];
      return rest;
    }

    const obj: any = {};
    DATA.forEach((d) => {
      obj[d.toLowerCase()] = false;
    });
    return obj;
  });
  const [upsetData] = useMutation(gql`
    mutation UpdateData($data: IData) {
      updateData(data: $data)
    }
  `);

  useEffect(() => {
    if (data.Data[0]?.signature) {
      signaturePad.current?.fromDataURL(data.Data[0].signature);
    }
  }, [data]);

  const onSave = async () => {
    const maintenanceId = parseInt(mid);
    const clientId = parseInt(data.id);

    const newData = {
      ...check,
      MaintenanceId: maintenanceId,
      ClientId: clientId,
      signature: signaturePad.current?.toDataURL(),
    };
    await upsetData({
      variables: {
        data: newData,
      },
    });
    refetch();
  };

  return (
    <>
      <Table aria-label="Maintenance check">
        <TableHeader>
          {DATA.map((d) => (
            <TableColumn key={d}>{d}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow key={1}>
            {DATA.map((d, i) => (
              <TableCell key={i}>
                <Switch
                  isSelected={check[d.toLowerCase()]}
                  onValueChange={(e) =>
                    setCheck((s: any) => {
                      return {
                        ...s,
                        [d.toLowerCase()]: e,
                      };
                    })
                  }
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
      <Spacer y={2} />
      <p>Signature : </p>
      <SignaturePad
        ref={signaturePad}
        options={{
          penColor: "white",
          backgroundColor: "#18181b",
        }}
      />
      <Spacer y={2} />
      <div className="w-max ml-auto space-x-2">
        <Button color="danger" onClick={() => signaturePad.current?.clear()}>
          Clear
        </Button>
        <Button color="success" onClick={onSave}>
          Save
        </Button>
      </div>
    </>
  );
}

export default Data;

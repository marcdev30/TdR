import React from "react";
import { useState } from "react";
import {
  Box,
  H3,
  Input,
  Button,
  Table,
  TableCaption,
  Icon,
  TableHead,
  TableRow,
  TableCell,
  CheckBox,
  Link,
  TableBody,
  Text,
} from "@adminjs/design-system";
import axios from "axios";

const MyCustomAction = (props) => {
  const { record } = props;
  const [nom, setNom] = useState();
  const [correu, setCorreu] = useState();
  const [producte, setProducte] = useState();
  const [estat, setEstat] = useState();

  return (
    <Box flex>
      <Box
        variant="white"
        width={1}
        style
        boxShadow="card"
        mr="xxl"
        flexShrink={0}
        display="flex"
        flexDirection="column"
        alignItems="center"
        columnGap="50px"
      >
        <H3>Entregar una comanda</H3>
        <p>Introdueix el número de comanda a continuació:</p>

        <Input width="200px" marginRight={"20px"} />
        <Button
          onClick={async (e) => {
            (
              await axios.get(
                "http://localhost:8080/admin/api/resources/Comanda/actions/list"
              )
            ).data.records.every(async (record) => {
              if (record.params.estat === "pendent") {
                const userRecord = (
                  await axios.get(
                    "http://localhost:8080/admin/api/resources/Usuari/records/" +
                      record.params.usuari +
                      "/show"
                  )
                ).data.record.params;
                const productRecord = (
                  await axios.get(
                    "http://localhost:8080/admin/api/resources/Producte/records/" +
                      record.params.producte +
                      "/show"
                  )
                ).data.record.params;
                setNom(userRecord.nom);
                setCorreu(userRecord.username);
                setProducte(productRecord.nom);
                setEstat(record.params.estat);
                return false;
              }
              return true;
            });
          }}
          variant={"contained"}
        >
          Acceptar
        </Button>
        {nom && (
          <div style={{ marginTop: "60px" }}>
            <Table borderColapse="collapse" position="relative">
              <TableCaption>
                <Text as="span">Resultat</Text>
              </TableCaption>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <CheckBox />
                  </TableCell>
                  <TableCell>
                    <Link href="#">Nom</Link>
                  </TableCell>
                  <TableCell>
                    <Link href="#">Correu</Link>
                  </TableCell>
                  <TableCell>Producte</TableCell>
                  <TableCell>Estat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <CheckBox />
                  </TableCell>
                  <TableCell>{nom}</TableCell>
                  <TableCell>{correu}</TableCell>
                  <TableCell>{producte}</TableCell>
                  <TableCell>{estat}</TableCell>
                  <TableCell>
                    <Button variant="contained">Marcar com a entregada</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default MyCustomAction;

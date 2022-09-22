import { useGetTransactionQuery } from "../../../../graphql/client";
import React from "react";
import { NextPage } from "next";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useAdmin } from "../../../hooks/admin";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";

const Page: NextPage = () => {
  const { roots, onClickLogOut } = useAdmin();
  const { data, loading } = useGetTransactionQuery();

  if (loading) {
    return <Loading />;
  }

  console.log(data);
  return (
    <>
      <Header roots={roots} onClickLogOut={onClickLogOut} />
      <Container maxWidth="sm">
        <Typography
          variant="h5"
          style={{ marginTop: "30px", textAlign: "center" }}
        >
          {"Admin's History"}
        </Typography>
      </Container>
      <Container component="main" maxWidth="lg">
        <Paper
          sx={{ width: "100%", overflow: "hidden" }}
          elevation={3}
          style={{ marginTop: "100px" }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableCell>created</TableCell>
                <TableCell align="left">command</TableCell>
              </TableHead>
              <TableBody>
                {data?.getTransaction?.map((d, key) => {
                  return (
                    <TableRow
                      key={key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell rowSpan={1}>{d?.created}</TableCell>
                      <TableCell align="left">{d?.command}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default Page;

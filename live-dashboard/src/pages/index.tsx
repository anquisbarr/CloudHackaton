import { Box } from "@chakra-ui/layout";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import { TableRegion } from "../components/TableRegion";
import styles from "../styles/Home.module.css";

export default function Home() {
  const data = [
    { name: "Región Metropolitana", valid_votes: 42, total_votes: 100 },
    {
      name: "Región de Antofagasta",
      valid_votes: 100,
      total_votes: 200,
    },
    {
      name: "Región de Valparaíso",
      valid_votes: 230,
      total_votes: 300,
    },
  ];

  return (
    <Box alignSelf={"center"}>
      <TableRegion data={data} />
    </Box>
  );
}

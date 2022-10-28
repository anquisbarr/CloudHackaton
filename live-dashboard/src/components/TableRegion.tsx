import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";

interface TableRegionProps {
  data: RegionProp[];
}

interface RegionProp {
  name: string;
  valid_votes: number;
  total_votes: number;
}

export const TableRegion = (props: TableRegionProps) => {
  return (
    <>
      <Table>
        <Thead>
          <Tr alignContent={'center'}>
            <Th>Región</Th>
            <Th>Votos válidos</Th>
            <Th>Total de votos</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.data.map((region: RegionProp) => {
              return (
                <Tr key={region.name}>
                  <Td>{region.name}</Td>
                  <Td>{region.valid_votes}</Td>
                  <Td>{region.total_votes}</Td>
                </Tr>
              );
          })}
        </Tbody>
      </Table>
    </>
  );
};

import { Flex, Text } from "@chakra-ui/layout";
import NextLink from "next/link";

export default function Header() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      color="blue.300"
    >
      <Flex align="start" mr={5}>
        <NextLink href={`/`}>
          <Text fontSize={"xl"} fontWeight="bold">
            LiveVoting
          </Text>
        </NextLink>
      </Flex>
      <Flex align="center" mr={5}>
        <Flex>
          <NextLink href={`/results`}>
            <Text fontSize={"md"} fontWeight="bold">
              Resultados
            </Text>
          </NextLink>
          <NextLink href={`/regions`}>
          <Text fontSize={"md"} fontWeight="bold" ml={5}>
            Votos por region
          </Text>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  );
}

import { useState } from "react";
import { Box, Button, Container, Flex, Heading, IconButton, Input, Text } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'

function App() {
  const [ipData, setIpData] = useState(null)
  const [search, setSearch] = useState("")

  return (
    <Container >
      <Heading my="8" mb="4" textAlign="center">Rurall IP controll center</Heading>

      <Box>
        <Flex justifyContent="center" >
          <Input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="181.167.175.214" mr="2" />
          <IconButton aria-label='Search ip data' icon={<SearchIcon />} mr="2" />
          <Button>Ban IP</Button>
        </Flex>
      </Box>
      {ipData &&
        <Box p="4" border="1px" mt="4" borderColor="gray.200" borderRadius="lg">
          <Text fontFamily="monospace" fontSize="md">ip: "{ipData.address}"</Text>
          <Text fontFamily="monospace" fontSize="md">country: "{ipData.code}"</Text>
          <Text fontFamily="monospace" fontSize="md">currency: "{ipData.currency}"</Text>
          <Text fontFamily="monospace" fontSize="md">currency rates:</Text>
          <Text fontFamily="monospace" fontSize="md"> - USD: "{ipData.currencyRates.USD}"</Text>
          <Text fontFamily="monospace" fontSize="md"> - EUR: "{ipData.currencyRates.EUR}"</Text>
        </Box>
      }
    </Container>
  );
}

export default App;

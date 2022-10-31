import { useState } from "react";
import { Box, Button, Container, Flex, Heading, IconButton, Input, Text } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import axios from "axios"
import validateIp from "./utils/validateIp"

function App() {
  const [ipData, setIpData] = useState(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false);

  const onSearch = async (e) => {
    e.preventDefault()
    if (!validateIp(search)) return alert("Invalid IP address")

    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ip-country-data/${search}`)
      setIpData({
        address: search,
        ...res.data.data
      })
    } catch (e) {
      alert(`Error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container >
      <Heading my="8" mb="4" textAlign="center">Rural IP control center</Heading>

      <Box>
        <Flex as="form" onSubmit={onSearch} justifyContent="center" >
          <Input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="181.167.175.214" mr="2" />
          <IconButton isLoading={loading} type="submit" aria-label='Search ip data' icon={<SearchIcon />} mr="2" />
          <Button type="button">Ban IP</Button>
        </Flex>
      </Box>
      {ipData !== null &&
        <Box p="4" border="1px" mt="4" borderColor="gray.200" borderRadius="lg">
          <Text fontFamily="monospace" fontSize="md">ip: "{ipData.address}"</Text>
          <Text fontFamily="monospace" fontSize="md">country: "{ipData.name}"</Text>
          <Text fontFamily="monospace" fontSize="md">country code: "{ipData.code}"</Text>
          <Text fontFamily="monospace" fontSize="md">currency: "{ipData.currency}"</Text>
          <Text fontFamily="monospace" fontSize="md">currency rates:</Text>
          <Text fontFamily="monospace" fontSize="md"> - USD: "{ipData.currencyRates?.USD}"</Text>
          <Text fontFamily="monospace" fontSize="md"> - EUR: "{ipData.currencyRates?.EUR}"</Text>
        </Box>
      }
    </Container>
  );
}

export default App;

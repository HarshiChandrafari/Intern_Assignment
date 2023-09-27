import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

// Stack of segments loading
const Chat_loading = () => {
  return (
      <Stack>
          <Skeleton height={"50px"} />
          <Skeleton height={"50px"} />
          <Skeleton height={"50px"} />
          <Skeleton height={"50px"} />
          <Skeleton height={"50px"} />
          <Skeleton height={"50px"} />
          <Skeleton height={"50px"} />
          <Skeleton height={"50px"} />
          <Skeleton height={"50px"} />
          <Skeleton height={"50px"} />
    </Stack>
  )
}

export default Chat_loading

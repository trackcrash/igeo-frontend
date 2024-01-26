import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Grid,
  GridItem,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";

function Donate() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button style={{ width: "200px" }} colorScheme="none" color="white" onClick={onOpen}>
        후원하기
      </Button>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent maxW="2xl">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              후원하기
            </AlertDialogHeader>
            <AlertDialogBody>
              <Grid w="auto" templateColumns="repeat(2, 1fr)" gap={3}>
                <GridItem rowSpan={1}>
                  <span style={{ color: "rgb(10, 85, 255)" }}>토스</span>로 후원하기
                  <Image src="img/donate/toss.png" alt="tossqr" />
                </GridItem>
                <GridItem rowSpan={1}>
                  <span style={{ color: "rgb(249, 224,0)" }}>카카오</span>로 후원하기
                  <Image src="img/donate/kakao.png" alt="kakaoqr" />
                </GridItem>
              </Grid>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}

export default Donate;

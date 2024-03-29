import imageCompression from "browser-image-compression";
import useChakraToast from "../useChakraToast";

export const compressImg = async (image: File) => {
  const toast = useChakraToast();
  try {
    const options = {
      maxSizeMB: 1,
    };
    return await imageCompression(image, options);
  } catch (e) {
    toast({
      title: "이미지 파일을 업로드해주세요!",
      status: "error",
    });
    // alert("이미지 파일을 업로드해주세요!");
    console.log(e);
    throw e;
  }
};

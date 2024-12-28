import { getStorage, getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { app } from "../firebase";

const storage = getStorage(app);

export const uploadFileAndReturnURL = async (file) => {
  let URL = "";
  const id = String(Date.now());
  if (!file) return;
  const storageRef = ref(storage, `profile/${id}`);

  try {
    const uploadTask = await uploadBytes(storageRef, file).then(async () => {
      await getDownloadURL(ref(storage, `profile/${id}`)).then((url) => {
        console.log(url)
        URL = url;
      });
    });
  } catch (error) {
    alert("Error while Uploading..");
  }

  return URL;
};
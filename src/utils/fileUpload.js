export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const base64ToFile = (base64String, filename = "image.jpg") => {
  try {
    // Remove the data:image/png;base64, part from the string
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

    // Convert base64 to blob
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: "image/jpeg" });

    // Create a File object
    return new File([blob], filename, { type: "image/jpeg" });
  } catch (error) {
    throw new Error("Error converting base64 to file: " + error.message);
  }
};

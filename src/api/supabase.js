
const uploadFile = async () => {
  // Pick a document from the device
  const result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf', // Only allow PDFs
  });

  if (result.type === 'success') {
    const { uri, name } = result;

    const response = await fetch(uri);
    const blob = await response.blob(); // Convert file to blob

    // Upload the PDF to the Supabase storage bucket
    const { data, error } = await supabase.storage
      .from('your-bucket-name') // Replace with your storage bucket name
      .upload(`pdfs/${name}`, blob, {
        contentType: 'application/pdf',
      });

    if (error) {
      console.error('Error uploading file:', error);
    } else {
      console.log('File uploaded successfully:', data);
    }
  }
};

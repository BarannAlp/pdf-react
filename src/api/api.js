import axios from "axios";

export const fetchItems= async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/pdfDetails/getFiles`, {
        });
  
        return response.data;
       
  
    } catch (error) {
        console.error("Error fetching PDF: ", error);
    }
  };

  export const deletePdf= async (id) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/pdfDetails/deleteFile/${id}`, {
        });
  
        return response.data;
       
  
    } catch (error) {
        console.error("Error fetching PDF: ", error);
    }
  };

  export const uploadFile = async (title, heading, file) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('heading', heading);
    formData.append('file', file);
  
    try {
      const response = await axios.post('http://localhost:8000/api/pdfDetails/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("File upload failed", error);
      throw new Error("File upload failed");
    }
  };
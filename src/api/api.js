import axios from "axios";
import { supabase } from '../supabaseClient';


export const fetchItems= async () => {
    try {
        const response = await axios.get(`https://pdf-node-seven.vercel.app/api/pdfDetails/getFiles`, {
        });
  
        return response.data;
       
  
    } catch (error) {
        console.error("Error fetching PDF: ", error);
    }
  };


  
  export const deletePdf = async (id, filePath) => {
    try {
      // Delete the PDF from your backend API
      const response = await axios.post(`https://pdf-node-seven.vercel.app/api/pdfDetails/deleteFile/${id}`, {});
  
      // If the API call is successful, proceed to delete from Supabase
      if (response.data.status === 'ok') {
        // Delete the file from Supabase Storage
        const { error } = await supabase.storage.from('Talimatlar').remove([filePath]); // Use the appropriate bucket name
  
        if (error) {
          throw new Error(`Supabase delete error: ${error.message}`);
        }
        
        return { status: 'ok', message: 'File deleted successfully from Supabase' };
      } else {
        return response.data; // Return response from the backend API if it’s not successful
      }
      
    } catch (error) {
      console.error("Error deleting PDF: ", error);
      throw new Error("File deletion failed");
    }
  };

  // export const uploadFile = async (title, heading, file) => {
  //   const formData = new FormData();
  //   formData.append('title', title);
  //   formData.append('heading', heading);
  //   formData.append('file', file);
  
  //   try {
  //     const response = await axios.post('https://pdf-node-seven.vercel.app/api/pdfDetails/uploadFile', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  
  //     return response.data;
  //   } catch (error) {
  //     console.error("File upload failed", error);
  //     throw new Error("File upload failed");
  //   }
  // };



  export const uploadFile = async (title, heading, file) => {
    try {
      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from('Talimatlar') // Replace with your bucket name
        .upload(`pdfs/${Date.now()}`, file);
  
      if (error) {
        console.error('File upload to Supabase failed', error);
        throw new Error('File upload to Supabase failed');
      }
  console.log(data)
      // Get the public URL of the uploaded file
      const filePath = data.path;

    // Get the public URL using the correct path (without the bucket name)
    const { data: publicUrlData } = supabase.storage.from('Talimatlar').getPublicUrl(filePath);
    const pdfUrl = publicUrlData?.publicUrl;
  
      // Call your API to save the title, heading, and file URL
      const response = await axios.post('https://pdf-node-seven.vercel.app/api/pdfDetails/uploadFile', {
        title,
        heading,
        pdfUrl,
        filePath
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("File upload failed", error);
      throw new Error("File upload failed");
    }
  };
  
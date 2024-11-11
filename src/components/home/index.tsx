import axios from "axios";
import { Button } from "baseui/button";
import { HeadingLarge,HeadingSmall } from "baseui/typography";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Container } from "../commons";
import { Header } from "../commons";
import { Tabs, Tab, Box } from '@mui/material';
import { useEffect, useState } from "react";
import { fetchItems,deletePdf,uploadFile } from "../../api/api";
import FileUploadModal from "../modal/fileUploadModal";
import './index.css'

function Home() {
  const singOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    singOut();
    navigate("/login");
  };

  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const [heading, setHeading] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [items, setItems] = useState([{
    _id: "",
    heading: "",
    pdfUrl: "",
    title: "",
    filePath: ""
  }]);
  
  const fetchData = async () => {
    try {
      const data = await fetchItems();
      console.log(data.data);
      
      // Sort the items alphabetically by 'heading'
      const sortedItems = data.data.sort((a:any, b:any) => a.heading.localeCompare(b.heading));
      
      // Update state with sorted items
      setItems(sortedItems);
      
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };


  const handleChange2 = (event:any, newValue:any) => {
    setValue2(newValue);
  }

  const handlePdfClick = (pdfUrl: any) => (event: React.MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault(); // Prevent the default action if necessary
    setPdfUrl(pdfUrl )
  };


  const handlePdfDelete = (id: any,filePath:any) => async (event: React.MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault(); // Prevent the default action if necessary
    
    // Show a confirmation dialog
    const isConfirmed = window.confirm("Talimatı silmek istediğine emin misin?");
    
    if (isConfirmed) {
      try {
        // Assuming 'deletePdf' handles the API call
        const response = await deletePdf(id,filePath);
  
        // Check if the delete was successful (you can adjust based on your API response)
        if (response.status === "ok") {
          alert("Talimat başarıyla silindi.");
        } else {
          alert("Talimat silinirkken sorun oluştu. Tekrar Deneyin.");
        }
  
        // Fetch the updated data after deleting
        fetchData();
      } catch (error) {
        // In case of an unexpected error
        console.error("Error deleting file:", error);
        alert("Talimat silinirkken sorun oluştu. Tekrar Deneyin.");
      }
    } else {
      // If the user cancels the deletion
      alert("Talimat silimi başarısız oldu.");
    }
  };
  

  
  
  useEffect(() => {
    fetchData();
}, []);


const [showModal, setShowModal] = useState<boolean>(false);

const handleFileUpload = async (file: File[]) => {
  try {
    // Assuming 'uploadFile' handles the API call
    const response = await uploadFile(heading, file);

    const errorResponse = response.find(result => result.status !== "ok");

    if (errorResponse) {
      // If there is an error in any result, alert the error
      alert("Talimat yüklenirken sorun oluştu. Tekrar Deneyin.");
    } else {
      // If all uploads are successful
      alert("Talimat başarıyla yüklendi.");
    }

    // Fetch the updated data after uploading
    fetchData();
  } catch (error) {
    // In case of an unexpected error
    console.error("Error uploading file:", error);
    alert("Talimat yüklenirken sorun oluştu. Tekrar Deneyin.");
  }
};

  return (
    <>
    <Header style={{backgroundColor:"#EAEAEA"}} >
    <img src="/images/yurtcim-logo.png" width="200" height="100" alt="Logo"/>
    <HeadingLarge  color="black"> Talimat Yönetim Paneli </HeadingLarge>

      <Button style={{marginRight:"10px", backgroundColor:"#879EAD"}} kind="secondary" onClick={logout}>
        Çıkış Yap
      </Button>
    </Header>


    <Container>
   
   <div style={{ display: 'flex',width:"100%",minHeight:"1000px"}}>
   <div style={{width:"50%",alignItems:"center",display:"flex",flexDirection:"column",backgroundColor:"#879EAD",borderRadius:"30px",marginTop:"30px"}}>
   
   <HeadingSmall  color="black">Talimatlar</HeadingSmall>

      <Box sx={{ display: 'flex',alignItems:"left",width:"100%",}}>
        {/* Tabs with vertical orientation */}
        <Tabs
        value={value}
        onChange={handleChange}
        orientation="vertical"
        variant="scrollable"
        sx={{
          
          borderRight: 3,
          borderColor: 'divider',
          '.MuiTab-root': { 
            fontWeight: 'bold', // Sets font weight for all tabs
            fontSize: '18px',   // Sets font size for all tabs
            textTransform: 'none', // Prevents uppercase transformation of text
            color: '#333',      // Default color for tab text
            '&.Mui-selected': {
              color: '#1976d2', // Changes text color when the tab is selected
            },
          }
        }}
      >
   <Tab label="Çevre" />
<Tab label="Elektrik Bakım" />
<Tab label="Enerji" />
<Tab label="Hammadde" />
<Tab label="İSG" />
<Tab label="Kalite" />
<Tab label="Makina Bakım" />
<Tab label="Mamül" />
<Tab label="Yarı Mamül" />


      </Tabs>

        {/* Tab content */}
        <Box sx={{ padding: 2 }}>


        {value === 0 && (
  <div className="pdf-list">
  <p className="add-new" onClick={() => { setShowModal(true); setHeading("Çevre"); }}>
      Ekle
    </p>
    {items
      .filter((pdfItem) => pdfItem.heading === "Çevre") // Filter items based on the heading
      .map((pdfItem, index) => (
        <div style={{display:"flex",justifyItems:"center"}} key={index}>
          <p className="pdf-title pdf-item" onClick={handlePdfClick(pdfItem.pdfUrl)}>
            {pdfItem.title}
          </p>
          <p
          
            className="pdf-delete"
            onClick={handlePdfDelete(pdfItem._id,pdfItem.filePath)}
          >
            Sil
          </p>
        </div>
        
      ))}
  
  </div>
)}

{value === 1 && (
  <div className="pdf-list">
     <p className="add-new" onClick={() => { setShowModal(true); setHeading("Elektrik Bakım"); }}>
      Ekle
    </p>
    {items
      .filter((pdfItem) => pdfItem.heading === "Elektrik Bakım") // Filter items based on the heading
      .map((pdfItem, index) => (
        <div style={{display:"flex",justifyItems:"center"}} key={index}>
          <p className="pdf-title pdf-item" onClick={handlePdfClick(pdfItem.pdfUrl)}>
            {pdfItem.title}
          </p>
          <p
          
            className="pdf-delete"
            onClick={handlePdfDelete(pdfItem._id,pdfItem.filePath)}
          >
            Sil
          </p>
        </div>
        
      ))}
   
  </div>
)}


        

        {value === 2 && (
  <div className="pdf-list">
      <p className="add-new" onClick={() => { setShowModal(true); setHeading("Enerji"); }}>
      Ekle
    </p>
    {items
      .filter((pdfItem) => pdfItem.heading === "Enerji") // Filter items based on the heading
      .map((pdfItem, index) => (
        <div style={{display:"flex",justifyItems:"center"}} key={index}>
          <p className="pdf-title pdf-item" onClick={handlePdfClick(pdfItem.pdfUrl)}>
            {pdfItem.title}
          </p>
          <p
          
            className="pdf-delete"
            onClick={handlePdfDelete(pdfItem._id,pdfItem.filePath)}
          >
            Sil
          </p>
        </div>
        
      ))}
  
  </div>
)}

{value === 3 && (
  <div className="pdf-list">
     <p className="add-new" onClick={() => { setShowModal(true); setHeading("Hammadde"); }}>
      Ekle
    </p>
    {items
      .filter((pdfItem) => pdfItem.heading === "Hammadde") // Filter items based on the heading
      .map((pdfItem, index) => (
        <div style={{display:"flex",justifyItems:"center"}} key={index}>
          <p className="pdf-title pdf-item" onClick={handlePdfClick(pdfItem.pdfUrl)}>
            {pdfItem.title}
          </p>
          <p
          
            className="pdf-delete"
            onClick={handlePdfDelete(pdfItem._id,pdfItem.filePath)}
          >
            Sil
          </p>
        </div>
        
      ))}
   
  </div>
)}


{value === 4 && <div>

<Box sx={{ display: 'flex'}}>
    <Tabs
      value={value2}
      onChange={handleChange2}
      orientation="vertical"    // Makes the tabs vertical (column)
      variant="scrollable"      // Allows scrolling if tabs exceed height
      sx={{
        borderRight: 3,
        borderColor: 'divider',
        '.MuiTab-root': { 
          fontWeight: 'bold', // Sets font weight for all tabs
          fontSize: '18px',   // Sets font size for all tabs
          textTransform: 'none', // Prevents uppercase transformation of text
          color: '#333',      // Default color for tab text
          '&.Mui-selected': {
            color: '#1976d2', // Changes text color when the tab is selected
          },
        }
      }}
    >
      <Tab label="Risk Değerlendirme" />
      <Tab label="Acil Durum Eylem Planı" />
    </Tabs>

    {/* Tab content */}
    <Box sx={{ padding: 2 }}>
    {value2 === 0 && (
    <div className="pdf-list">
      <p className="add-new" onClick={() => { setShowModal(true); setHeading("Risk Değerlendirme"); }}>
        Ekle
      </p>
      {items
        .filter((pdfItem) => pdfItem.heading === "Risk Değerlendirme") // Filter items based on the heading
        .map((pdfItem, index) => (
          <div style={{display:"flex",justifyItems:"center"}} key={index}>
            <p className="pdf-title pdf-item" onClick={handlePdfClick(pdfItem.pdfUrl)}>
              {pdfItem.title}
            </p>
            <p
            
              className="pdf-delete"
              onClick={handlePdfDelete(pdfItem._id,pdfItem.filePath)}
            >
              Sil
            </p>
          </div>
          
        ))}
      
    </div>
  )}
                              {value2 === 1 && (
    <div className="pdf-list">
      <p className="add-new" onClick={() => { setShowModal(true); setHeading("Acil Durum Eylem Planı"); }}>
        Ekle
      </p>
      {items
        .filter((pdfItem) => pdfItem.heading === "Acil Durum Eylem Planı") // Filter items based on the heading
        .map((pdfItem, index) => (
          <div style={{display:"flex",justifyItems:"center"}} key={index}>
            <p className="pdf-title pdf-item" onClick={handlePdfClick(pdfItem.pdfUrl)}>
              {pdfItem.title}
            </p>
            <p
            
              className="pdf-delete"
              onClick={handlePdfDelete(pdfItem._id,pdfItem.filePath)}
            >
              Sil
            </p>
          </div>
          
        ))}
      
    </div>
  )}
    </Box>
</Box>
  
  
</div>}



{value === 5 && (
  <div className="pdf-list">
     <p className="add-new" onClick={() => { setShowModal(true); setHeading("Kalite"); }}>
      Ekle
    </p>
    {items
      .filter((pdfItem) => pdfItem.heading === "Kalite") // Filter items based on the heading
      .map((pdfItem, index) => (
        <div style={{display:"flex",justifyItems:"center"}} key={index}>
          <p className="pdf-title pdf-item" onClick={handlePdfClick(pdfItem.pdfUrl)}>
            {pdfItem.title}
          </p>
          <p
          
            className="pdf-delete"
            onClick={handlePdfDelete(pdfItem._id,pdfItem.filePath)}
          >
            Sil
          </p>
        </div>
        
      ))}
   
  </div>
)}

{value === 6 && (
  <div className="pdf-list">
    <p className="add-new" onClick={() => { setShowModal(true); setHeading("Makina Bakım"); }}>
      Ekle
    </p>
    {items
      .filter((pdfItem) => pdfItem.heading === "Makina Bakım") // Filter items based on the heading
      .map((pdfItem, index) => (
        <div style={{display:"flex",justifyItems:"center"}} key={index}>
          <p className="pdf-title pdf-item" onClick={handlePdfClick(pdfItem.pdfUrl)}>
            {pdfItem.title}
          </p>
          <p
          
            className="pdf-delete"
            onClick={handlePdfDelete(pdfItem._id,pdfItem.filePath)}
          >
            Sil
          </p>
        </div>
        
      ))}
    
  </div>
)}

{value === 7 && (
  <div className="pdf-list">
     <p className="add-new" onClick={() => { setShowModal(true); setHeading("Mamül"); }}>
      Ekle
    </p>
    {items
      .filter((pdfItem) => pdfItem.heading === "Mamül") // Filter items based on the heading
      .map((pdfItem, index) => (
        <div style={{display:"flex",justifyItems:"center"}} key={index}>
          <p className="pdf-title pdf-item" onClick={handlePdfClick(pdfItem.pdfUrl)}>
            {pdfItem.title}
          </p>
          <p
          
            className="pdf-delete"
            onClick={handlePdfDelete(pdfItem._id,pdfItem.filePath)}
          >
            Sil
          </p>
        </div>
        
      ))}
   
  </div>
)}

{value === 8 && (
  <div className="pdf-list">
     <p className="add-new" onClick={() => { setShowModal(true); setHeading("Yarı Mamül"); }}>
      Ekle
    </p>
    {items
      .filter((pdfItem) => pdfItem.heading === "Yarı Mamül") // Filter items based on the heading
      .map((pdfItem, index) => (
        <div style={{display:"flex",justifyItems:"center"}} key={index}>
          <p className="pdf-title pdf-item" onClick={handlePdfClick(pdfItem.pdfUrl)}>
            {pdfItem.title}
          </p>
          <p
          
            className="pdf-delete"
            onClick={handlePdfDelete(pdfItem._id,pdfItem.filePath)}
          >
            Sil
          </p>
        </div>
        
      ))}
   
  </div>
)}


      </Box>
    </Box>
    </div>
    
    <div style={{width:"50%",alignItems:"center",display:"flex",flexDirection:"column",marginTop:"30px",backgroundColor:"#EAEAEA",borderRadius:"30px"}}>
    <HeadingSmall  color="black">Önizleme</HeadingSmall>
{ pdfUrl != "" ? (

 <iframe
 src={pdfUrl}
 title="PDF Viewer"
 width="100%"
 height="100%"
 style={{ border: 'none' }}
/>
):null}
   
    </div>
    </div>

<FileUploadModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onFileUpload={handleFileUpload}
      />
    </Container>
    

    
    </>
  );

  
}

export { Home };

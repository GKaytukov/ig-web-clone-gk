import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { Modal, Form, Input, Button, Upload } from "antd"

const firebaseConfig = {
   apiKey: "AIzaSyCJzXHk8Xjzn6Rs1EW7AtcTvnef5x8MpiE",
   authDomain: "upload-storage-gk.firebaseapp.com",
   projectId: "upload-storage-gk",
   storageBucket: "upload-storage-gk.appspot.com",
   messagingSenderId: "725290773001",
   appId: "1:725290773001:web:23b79bc307c8ad0fe9e6d8"
 };


export default function UploadModal({ setShowUpload, setPhotoList }) {
    const handleNewPhoto = (values) => {
      console.log(values)
        //0.Connect to firebase storage
         const app = initializeApp(firebaseConfig)
         const storage = getStorage(app)
        //1. Upload photo to storage 
        const filename = values.photo.file.name
        const imageRef = ref(storage, `photos/${filename}`)
        uploadBytes(imageRef, values.photo.file.orginFileObj)
         .then(() => console.log('upload successful'))
         .catch(err => console.error(err))
        //2. Figure out the URL for that photo
        const photoUrl =`https://firebasestorage.googleapis.com/v0/b/upload-storage-gk.appspot.com/o/${filename}?alt=media`
        //3. Put that URL into a new photo 
        let newPhotoObj = values
        newPhotoObj.photo = photoUrl
        //4. Send a post request to API
        fetch('https://express-ts-gk.web.app/photos',{ 
        method: 'POST',
        headers: {'Content-Type': 'application/json' }, 
        body: JSON.stringify(newPhotoObj)
    })

      .then(results => results.json())
      .then(newListOfPhotos => {
      //5. Get back new list of photos
      setPhotoList(newListOfPhotos)
      //6. setPhotoList and close Modal
      closeModal()
    })
      .catch(alert)
        //send a post request to API
        //get back new list of photos
        //set PhotoList 
    }
    const closeModal = () => setShowUpload(false)
     return (
        <Modal title="Upload Photo" open={true} footer={null} onCancel={closeModal}>
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleNewPhoto}>
             <Form.Item label="User Name" name="username">
                <Input required />
             </Form.Item>
             <Form.Item label="Profile Picture URL" name="profilePic">
                <Input required />
             </Form.Item>
             <Form.Item label="Photo" name="photo">
               <Upload listType="picture-card">
                  +<br />Upload
               </Upload>
             </Form.Item>
             <Form.Item label="Description" name="description">
                <Input.TextArea rows={4} required />
             </Form.Item>
             <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">Save Photo</Button>
             </Form.Item>
            </Form>
        </Modal>
    )
}
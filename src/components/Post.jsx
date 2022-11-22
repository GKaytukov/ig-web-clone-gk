import { Card, Avatar, Button } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'

export default function Post({ post, setPhotoList }) {
    
    const likeButton = () => {
        fetch('http://localhost:5002/photos/' + post.photoid, {
        method: 'PATCH'
    }) 
    .then(results => results.json())
    .then(newListPhotos => {
    setPhotoList(newListPhotos)})
    .catch(alert)
    //Send a patch request /photos/photoId 
    //and then update photoList 
return (
    <Card 
            hoverable
            actions={[<Space style={{ marginLeft: 37 }}>
                <button onClick={likeButton} /> <HeartTwoTone twoToneColor/>
            </Space> 
            ]}
            color={'hot pink'}
            style={{ width: 300, padding: 10, margin: 2 }}
            cover={
                <img alt={post.description} src={post.photo} />
               
        >
            <Card.Meta 
                avatar={<Avatar src="https://randomuser.me/api/portraits/men/3.jpg" />}
                title={post.username}
                description={post.description}
            />
        </Card>       
    )
}


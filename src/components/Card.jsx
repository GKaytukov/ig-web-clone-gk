import { useState, useEffect } from 'react'
import { Card, Avatar, Button } from 'antd'
import { useContext } from 'react'
import { UserContext } from '..App'

export default function Post({ photo }) {
    const{user} = useContext(UserContext)
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(0)
    const like = () => {
        fetch(`https://express.ts.gk.web.app/likes/${photo.id}/${user.uid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        .then(res => res.json())
        .then((res) => {
            setIsLiked(res.isLiked)
        })
        .catch(console.error)

    }

    useEffect(() => {
        fetch(`https://express.ts.gk.web.app/likes/${photo.id}/${user.uid}`)
        .then(response => response.json())
        .then((response) => {
            setIsLiked(response.isLiked)
            setLikes(response.likes)
        })

        .catch(console.error)
    },[setIsLiked, user.uid, photo.id])

    return (
        <Card 
            style={{
                width: 300,
            }}

            hoverable
            cover={
                <img
                alt={photo.description}
                src={photo.photo}
                />
            }
            actions={[
                <Button onClick={like}>{isLiked ? "blue heart emoji" : "red heart emoji"}</Button>
            ]}
        >
            <Card.Meta
            avartar={<Avatar src={photo.profilePic} />}
            title={"Likes " + likes}
            description={photo.username + "=>" + photo.description}
        />
        </Card>
        
         )
        }

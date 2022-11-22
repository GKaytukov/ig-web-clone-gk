import Post from '../components/post'
import styles from '../styles'
import photoList from '../photolist'
import { View } from 'react-native'
import { useEffect, useState } from 'react'

export default function Details({ routes: {params: { itemId }}, navigator})
//const post = photolist.find(photo => photo.id === itemId)
useEffect (() => {
    fetch ('https://express-gk-gd.web.app/photos')
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(alert)
}, 
[])
return(
    <View style={styles.feed}>
        <Post post={post} navigator={navigator}/>
    </View>
)

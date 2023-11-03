import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import book_image from '../images/books.jpg';
import electronic_image from '../images/electronic.jpg';
import clothing_image from '../images/clothing.jpg';

export default function Slide()
{
    var items = [
        {
            name: "ELECTRNOICS",
            description: "Get all you electrnoic need from here",
            image : electronic_image
        },
        {
            name: "BOOKS",
            description: "All you can read is here",
            image : book_image
        },
        {
            name: "CLOTHING",
            description: "All your latest fashion is here.",
            image : clothing_image
        }
        
    ]

    return (
        <Carousel indicators={false}>
            {
                items.map( (item, i) => <Item key={i} item={item}/> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper
    style={{
        backgroundImage: `url(${props.item.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        height:'300px'
    }}
>
<div style={{ position: 'absolute', bottom: '20px', left: '20px', textAlign: 'left' }}>
        <h2>{props.item.name}</h2>
        <p>{props.item.description}</p>
    </div>
</Paper>
    )
}
import { editableInputTypes } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import YaziYorumlari from './YaziYorumlari';



const YaziDetayi = (props) => {
    const { id } = useParams();

    const [yaziDetayi, setYaziDetayi] = useState([]);
    const [yorumlar, setYorumlar] = useState([]);



    const handleCommitSubmit = (event,comment) => {
        event.preventDefault();
        axios.post(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`, comment)
            .then(response => {
                setYorumlar([...yorumlar, response.data])
                
            })
            .catch(error => {
                console.log(error)
            })

    }

    useEffect(() => {
        axios.all([
            axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`),
            axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`),
        ]).then((responses) => {
            setYaziDetayi(responses[0].data);
            setYorumlar(responses[1].data);
        });

        // axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`)
        //     .then(response => {
        //         setYaziDetayi(response.data)
        //     })
        //     .catch((error) => {
        //         console.log((error))
        //     })
        // axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`)
        //     .then(response => {
        //         setYorumlar(response.data)
        //     })
    }, [])


    return (<React.Fragment>
        <h2 className="ui header">{yaziDetayi.title}</h2>
        <p>{yaziDetayi.created_at}</p>
        <p>{yaziDetayi.content}</p>

        <YaziYorumlari yorumlar={yorumlar} handleSubmit={handleCommitSubmit}/>
        

    </React.Fragment>
    )
}
export default YaziDetayi;
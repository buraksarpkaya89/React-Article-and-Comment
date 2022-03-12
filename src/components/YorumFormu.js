import React,{useState} from 'react'


const COMMENT_START = {
    display_name: '',
    body: ''
}

const YorumFormu = (props) => {
    const [comment, setComment] = useState(COMMENT_START);
    


    const handleOnChange = event => {
        setComment({ ...comment, [event.target.name]: event.target.value })
    }


    return (
        <div>
            <React.Fragment>
                <h3>Yorum Yaz</h3>
                <form className="ui form" onSubmit={(event)=>{
                
                props.handleSubmit(event,comment)
                setComment(COMMENT_START)
                
                
                }}>
                    <div className="ui mini icon input">
                        <input type="text" placeholder="Adınız" onChange={handleOnChange} value={comment.display_name} name='display_name' />
                    </div>
                    <textarea placeholder="Yorum Yaz" rows="3" onChange={handleOnChange} value={comment.body} name='body'></textarea>
                    <button className="ui blue button" type='submit'>Gönder</button>
                </form>
            </React.Fragment>
        </div>
    )
}

export default YorumFormu;
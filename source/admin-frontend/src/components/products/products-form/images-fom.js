import React from 'react';

export default function ImageForm(props) {


    const handleDeleteImg = (e) => {
        e.preventDefault();
        let index = parseInt(e.target.id.match(/\d+/)[0]);
        props.handleDeleteImage(index)
        return
    }
    let list = props.images.map((image, index) => {
        return <div>
            <a target="_blank" href={image}>
                <img src={image} style={{ 'width': '100px' }} />

            </a>
            <button
                onClick={handleDeleteImg}
                className="badge badge-warning"
                id={'btn-delete-tag-' + index}
            >
                &#10007;
            </button>

        </div>
    })
    return (
        <div style={{
            "display": "grid",
            "gridTemplateColumns": " 1fr 1fr 1fr 1fr ",
            "gridGap": "5px",
            'width': '100%',
            'marginTop': '15px'
        }}>
            <button
                className="btn btn-success"
                onClick={props.handleAddImage}>+</button>
            {list}

        </div>
    );
}


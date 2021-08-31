import React, { useState } from 'react';

export default function TagsForm(props) {
    const [showAddTag, setShowAddTag] = useState(false)

    const handleTagDelete = (e) => {
        e.preventDefault();
        let tag = e.target.id.match(/(?<=btn-delete-tag-)\w+/i)
        props.deleteTag(tag)
        return
    }
    let list = props.tags.map(tag => {
        return <div>{tag}
            <button
                onClick={handleTagDelete}
                className="badge badge-warning"
                id={'btn-delete-tag-' + tag}
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
            <div>
                <button
                    className="badge badge-success"
                    onClick={() => setShowAddTag(true)}>+</button>
                    <AddTag
                        show={showAddTag}
                        close={()=>setShowAddTag(false)}
                        allowTags={props.allowTags}
                        handleAddTag={props.handleAddTag}
                    />
            </div>
            {list}
        </div>
    );
}

function AddTag(props) {

const handleAddTag=(e)=>{
e.preventDefault();
let tag=e.target.id.match(/(?<=btn-add-tag-)\w+/i)[0];
props.handleAddTag(tag)
}//end hanldeAddTag

    let content=<div></div>;
    if(props.show){
    let keys=Object.keys(props.allowTags);
    let subcontent=keys.map(cat=>{
        let list=props.allowTags[cat].map(tag=>{
            return <button
            className="badge badge-info"
            id={'btn-add-tag-'+tag}
            onClick={handleAddTag}
            >{tag}</button>
        })
        return <li>
            {cat}:
            {list}
        </li>
    })
    content=<div
    style={{
                    'padding': '20px',
                    'border':'solid',
                    'display': 'block',
                    'position': 'absolute',
                    'z-index': '1',
                    'top': '20%',
                    'left': '15%',
                    'backgroundColor': 'rgb(235, 237, 239 )',
                    'box-shadow': '10px 10px 5px gray'
                }}
    >
         <button
                    className="badge badge-secondary"
                    onClick={props.close}>x</button>
                   <ul>{subcontent}</ul>
    </div>
    }//end if
    
    return (
        <div>
        {content}
           
        </div>
    );
}
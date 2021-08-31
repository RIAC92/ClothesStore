import React, { Component } from 'react';
import axios from 'axios'
import { Domain } from '../../vars';


export default class TagsEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: {},
            edit: '',
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSave = this.handleSave.bind(this);

    }//end constructor-
    componentDidMount() {
        axios.get(Domain + '/admins/config/tags')
            .then(res => {
                let data = res.data;
                this.setState({
                    tags: data
                })
            }).catch(e => {
                console.error(e)
                alert('Ha ocurrido un error!')
            })
    }//end componentDidMount
    handleDelete(e) {
        e.preventDefault()
        let regex = /(?<=btn-delete-)\w+/i;
        let CatName = e.target.id.match(regex)[0];
        let r = window.confirm('Desea borrar la categoria: ' + CatName);
        if (r) {
            let newTags = Object.assign({}, this.state.tags);
            delete newTags[CatName];
            this.setState({
                tags: newTags
            })
        }
    }//end handleDelete-

    handleEdit(e) {
        e.preventDefault()
        let regex = /(?<=btn-edit-)\w+/i;
        let CatName = e.target.id.match(regex)[0];
        this.setState({
            edit: CatName
        });//end setState
    }//end handleEdit

    handleAdd() {
        let newTag = prompt("Nueva Categoria");
        if (!newTag || newTag.search(/[a-zA-Z0-9]/) === -1||newTag.search(/\W/)!==-1) {
            return
        }
        let r = window.confirm('Desea agregar: ' + newTag+'?');
        if (r) {
            let newTags = Object.assign({}, this.state.tags);
            newTags[newTag]=[]; 
            
            this.setState({
                tags:newTags
            })
        }
        return
    }//end handleAdd

    handleSave(){
        let r=window.confirm('Esta Acción "NO" se podrá deshacer ¿Desea Continuar?');
        if(r){
            let body={
                fileName:'tags',
                dataUpdate:this.state.tags
            }
            axios.put(Domain + '/admins/config',body)
            .then(res => {
                alert(res.data.message||res.data.error);
                return
            
            }).catch(e => {
                console.error(e)
                alert('Ha ocurrido un error de conexión!')
            })
        }
    }
    render() {

        let keys = Object.keys(this.state.tags);
        let list = keys.map((key, index) => {

            return <li key={'tag' + index}>
                <b>{key}</b>:{' ' + this.state.tags[key].join(', ')}
                {'  '}
                <button
                    onClick={this.handleDelete}
                    className="badge badge-warning"
                    id={'btn-delete-' + key}
                >

                    &#10007;
                </button>
                {' '}|{' '}
                <button
                    className="badge badge-success"
                    id={'btn-edit-' + key}
                    onClick={this.handleEdit}
                >&#9999;</button>
            </li>
        })//end map
        return (
            <div>
                <h3>Categorias:</h3> 
                <button
                className="badge badge-info" 
                onClick={this.handleSave} 
                >&#128190;Guardar</button>
                <ul>
                    {list}
                    
                    

                </ul>
                <div style={{
                    'display':'flex',
                    'flexDirection':'row'
                }}>
                <button
                 className="badge badge-secondary"  
                 onClick={this.handleAdd}
                >Agregar</button>
                <Edit
                        tags={this.state.tags}
                        edit={this.state.edit}
                        close={() => this.setState({ edit: '' })}
                        update={newTags => this.setState({ tags: newTags })}
                    />
                     </div> 
                    
            </div>
        )
    }
}//end tagsEditor
//-------------------------------------------------------------------------------------------

function Edit(props) {
    const handleDelete = (e) => {
        e.preventDefault()
        let regex = /(?<=btn-delete-tag-)\w+/i;
        let tagName = e.target.id.match(regex)[0];
        let r = window.confirm('Desea borrar la etiqueta: ' + tagName + '?');
        if (r) {
            let newTags = Object.assign({}, props.tags);
            let newContentCat = newTags[props.edit].filter(item => item !== tagName);
            newTags[props.edit] = newContentCat;
            props.update(newTags)
        }
        return
    }//end handle Delete
    const handleAdd = () => {
        let newTag = prompt("Nueva Etiqueta");
        if (!newTag || newTag.search(/[a-zA-Z0-9]/) === -1||newTag.search(/\W/) !== -1) {
            return
        }
        let r = window.confirm('Desea agregar: ' + newTag+'?');
        if (r) {
            let newTags = Object.assign({}, props.tags);
            let newContentCat = [...props.tags[props.edit], newTag];
            newTags[props.edit] = newContentCat;
            props.update(newTags)
        }
        return
    }//end handleAdd


    let show = <span>&#128466;</span>
    if (Object.keys(props.tags).indexOf(props.edit) !== -1) {
        show = <div
            style={{
                'padding': '20px',
                'display': 'block',
                'position': 'absolute',
                'z-index': '1',
                'top': '25%',
                'left': '40%',
                'backgroundColor': 'rgb(235, 237, 239 )',
                'box-shadow': '5px 5px 5px gray'
            }}

        >
            <button
                className="badge badge-secondary"
                onClick={props.close}>x</button>
            Editar etiquetas de:<b>{' ' + props.edit}</b>
            <ul>
                {props.tags[props.edit].map((item) => {
                    return <li>
                        {item}{' '}
                        <button
                            onClick={handleDelete}
                            className="badge badge-warning"
                            id={'btn-delete-tag-' + item}
                        >
                            &#10007;
                        </button>

                    </li>
                })}
            </ul>
            <button
                className="badge badge-secondary"
                onClick={handleAdd}
            >Agregar</button>
        </div>
    }//end if
    return (
        <div
        >{show}
        </div>
    )
}
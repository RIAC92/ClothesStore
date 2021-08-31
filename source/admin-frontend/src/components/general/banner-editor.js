import React, { Component } from 'react';
import axios from 'axios'
import { Domain } from '../../vars';


export default class BannerEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            banners: [],
            edit: {
                index: -1,
                img: '',
                title: '',
                description: ''
            },
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSave = this.handleSave.bind(this);

    }//end constructor-
    componentDidMount() {
        axios.get(Domain + '/admins/config/banner')
            .then(res => {
                let data = res.data;
                this.setState({
                    banners: data
                })
            }).catch(e => {
                console.error(e)
                alert('Ha ocurrido un error!')
            })
    }//end componentDidMount
    handleDelete(e) {
        e.preventDefault()
        let regex = /\d+/;
        let bannerIndex = e.target.id.match(regex)[0];
        let r = window.confirm('Desea borrar el banner: ' + bannerIndex + '?');
        if (r) {
            let newBanners = this.state.banners.filter((b, i) => i !== parseInt(bannerIndex));
            this.setState({
                banners: newBanners

            })
        }
    }//end handleDelete-

    handleEdit(e) {
        e.preventDefault()
        let regex = /\d+/;
        let index = parseInt(e.target.id.match(regex)[0]);
        let edit = Object.assign({}, this.state.banners[index]);
        edit.index = index;
        this.setState({
            edit: edit
        });//end setState
    }//end handleEdit

    handleAdd() {
        let edit = {
            index: this.state.banners.length,
            img: '',
            title: '',
            description: ''
        }
        let newBanners = [...this.state.banners, {
            img: '',
            title: '',
            description: ''
        }]
        this.setState({
            banners: newBanners,
            edit: edit
        })
    }//end handleAdd

    handleSave() {
        let r = window.confirm('Esta Acción "NO" se podrá deshacer ¿Desea Continuar?');
        if (r) {
            let body = {
                fileName: 'banner',
                dataUpdate: this.state.banners
            }
            axios.put(Domain + '/admins/config', body)
                .then(res => {
                    alert(res.data.message || res.data.error);
                    return

                }).catch(e => {
                    console.error(e)
                    alert('Ha ocurrido un error de conexión!')
                })
        }
    }
    render() {


        let list = this.state.banners.map((banner, index) => {

            return <div
                key={'banner' + index}
                style={{
                    'display': 'flex',
                    'flexDirection': 'column',
                    'justifyContent': 'center',
                    'alignItems': 'center',
                    'border': 'solid',
                    'width': "100%",
                    'margin': '0px'
                }}
            >
                <figure
                    key={'banner-figure-' + index}
                >
                    <img
                        src={banner.img} alt="image"
                        style={{ 'width': '100%' }}
                    />
                    <figcaption style={{ 'textAlign': 'center' }}>{index + '. '}{banner.title}</figcaption>
                    <div style={{ 'textAlign': 'center' }}>{banner.description}</div>
                </figure>
                <div>
                    <button
                        onClick={this.handleDelete}
                        className="badge badge-warning"
                        id={'btn-banner-delete-' + index}
                    >

                        &#10007;
                    </button>
                    {' '}|{' '}
                    <button
                        className="badge badge-success"
                        id={'btn-banner-edit-' + index}
                        onClick={this.handleEdit}
                    >&#9999;</button>
                </div>
            </div>
        })//end map
        return (
            <div>
                <h3>Banners:</h3>
                <button
                    className="badge badge-info"
                    onClick={this.handleSave}
                >&#128190;Guardar</button>

                <div style={{
                    "display": "grid",
                    "gridTemplateColumns": " 1fr 1fr  1fr ",
                    "gridGap": "10px",
                    'width': '100%',
                    'marginTop': '15px'
                }}>
                    {list}

                </div>

                <div style={{
                    'display': 'flex',
                    'flexDirection': 'row'
                }}>
                    <button
                        className="badge badge-secondary"
                        onClick={this.handleAdd}
                    >Agregar</button>
                    <EditBanner
                        update={newBanners => this.setState({ banners: newBanners })}
                        banners={this.state.banners}
                        edit={this.state.edit}
                        close={() => this.setState({
                            edit: {
                                index: -1,
                                img: '',
                                title: '',
                                description: ''
                            }
                        })}
                    />
                </div>

            </div>
        )
    }
}//end tagsEditor
//-------------------------------------------------------------------------------------------



function EditBanner(props) {
    const handleChange = (e) => {

        let regex = /\d+/;
        let index = parseInt(e.target.id.match(regex)[0]);
        let newBanners = props.banners.slice();
        newBanners[index][e.target.name] = e.target.value
        props.update(newBanners)
        return
    }//end handle Delete
    

    let show = <span>&#128466;</span>
    if (props.edit.index > -1&&props.edit.index<props.banners.length) {
        show = <div
            style={{
                'padding': '20px',
                'display': 'block',
                'position': 'fixed',
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
            Editar banner:<b>{'#' + props.edit.index}</b>
            <ul>
                <li>
                    <label for={'input-banner-img-' + props.edit.index}>Imagen</label>
                    <input type="text" id={'input-banner-img-' + props.edit.index}
                        name="img"
                        value={props.banners[props.edit.index].img}
                        onChange={handleChange}
                    />
                </li>
                <li>
                    <label for={'input-banner-title-' + props.edit.index}>Titulo</label>
                    <input type="text" id={'input-banner-title-' + props.edit.index}
                        name="title"
                        value={props.banners[props.edit.index].title}
                        onChange={handleChange}
                    />
                </li>
                <li>
                    <label for={'input-banner-description-' + props.edit.index}>Descripcion</label>
                    <input type="textarea" id={'input-banner-description-' + props.edit.index}
                        name="description"
                        value={props.banners[props.edit.index].description}
                        onChange={handleChange}
                    />
                </li>
            </ul>
        </div>
    }//end if
    return (
        <div
        >{show}
        </div>
    )
}//end 
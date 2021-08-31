import axios from 'axios';
import React, { Component } from 'react';
import { Domain } from '../../../vars';

import TagsForm from './tags-fom';
import ImageForm from './images-fom';




export default class ProductsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            tags: {},
            suppliers:[]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleAddTag = this.handleAddTag.bind(this);
        this.handleAddImage = this.handleAddImage.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
        this.handleChangeSelect=this.handleChangeSelect.bind(this);
        this.handleSave = this.handleSave.bind(this);


        



    }//end constructor
    componentDidMount() {
        let tags={};
        let suppliers=[]
        axios.get(Domain + '/admins/config/tags')
            .then(res => {
                tags=Object.assign({},res.data);
                return axios.get(Domain+'/admins/suppliers')
            })
            .then(res=>{
                suppliers=res.data.slice();
                this.setState((s, p) => ({
                    product: p.product,
                    tags,
                    suppliers
                }));//end setState
            })
            .catch(e=>{
                console.log(e);
                alert('Ha ocurrido un error, posible fallo de conexión')
            })
    }//end componentDidMount

    componentDidUpdate(prevProps) {

        if (this.props.show !== prevProps.show) {
            this.setState((s, p) => ({
                product: p.product
            }));
        }
    }
    handleChange(e) {
        let newProduct = Object.assign({}, this.state.product);
        let key = e.target.id.match(/(?<=input-product-)\w+/i)[0];
      
        if (key==="stock"||key==="price"||key==="discount"){
            newProduct[key] = parseFloat(e.target.value)


        }else{
        newProduct[key] = e.target.value
        }
        this.setState({ product: newProduct });
    }

    handleTagDelete(tag) {
        let r = window.confirm('¿Eliminar la etiqueta: ' + tag + '?');
        if (!r) { return }
        let newProduct = Object.assign({}, this.state.product);
        let tagsArr = this.state.product.tags.filter(t => t != tag);

        newProduct.tags = tagsArr;
        this.setState({ product: newProduct });

    }
    handleAddTag(tag) {
        let newProduct = Object.assign({}, this.state.product);

        if (this.state.product.tags.indexOf(tag) !== -1) {
            return
        } else {
            let tagsArr = [...this.state.product.tags, tag];
            newProduct.tags = tagsArr;
            this.setState({ product: newProduct });
        }

    }
    handleAddImage() {
        let image = window.prompt('Ingrese la Url de la nueva imagen');
      
        if(!image){
            return
        }else if (image.search(/http/) === -1) {
            return
        }
        let newProduct = Object.assign({}, this.state.product);
        let images = [...this.state.product.images, image];
        newProduct.images = images;
        this.setState({ product: newProduct });

    }

    handleDeleteImage(index) {
        let r = window.confirm('¿Eliminar la imagen: ' + index + '?');
        if (!r) { return }
        let newProduct = Object.assign({}, this.state.product);
        let images = this.state.product.images.filter((item, i) => i !== index);
        newProduct.images = images;
        this.setState({ product: newProduct });
    }
  
    handleChangeSelect(e) {
        let newProduct = Object.assign({}, this.state.product);
        let key=e.target.name;
        if (key==='size'){
            newProduct[e.target.name] = [e.target.value];
        }else{
            newProduct[e.target.name] =e.target.value;    
        }
        this.setState({ product: newProduct });
    }

    handleSave(e){
        e.preventDefault();
        let r= window.confirm('Esta acción "NO" se podrá deshacer, ¿Desea guardar los cambios?');
        if(!r){return}
        let body={};
        body.buy_code=this.state.product.buy_code;
        body.dataUpdate=this.state.product;
        axios(Domain+'/admins/products',{method:this.props.method,data:body})
        .then(res=>{
            alert(res.data.message||res.data.error);
            return
        })
        .then(()=>this.props.load())
        .then(()=>this.props.close())
        .catch(e=>{
            console.log(e);
            alert('Ha ocurrido un error!')
        })
        
    }





    render() {
        let form = <span>{''}</span>
        if (this.props.show) {

            let keys = Object.keys(this.state.product)
            let inputs = keys.map((key, index) => {
                let typeInput = ''
                switch (typeof (this.state.product[key])) {
                    case 'number':
                        typeInput = 'number';
                        break;
                    case 'string':
                        typeInput = 'text';
                        break;
                    default:
                        typeInput = '';


                }
                //banned atributes
                if (key === '_id' || key === '__v' || key === 'created_on' || key === 'updated_on' ||key==='supplier_id'||key==='edited_by') {
                    return
                }else if(key===(this.props.buy_code?"":'buy_code')){

                } else if (typeInput === 'number' || typeInput === 'text') {
                    return <li><label>
                        {key}:
                        <input
                            id={'input-product-' + key}
                            type={typeInput}
                            value={this.state.product[key]}
                            onChange={this.handleChange}
                        />
                    </label>   </li>
                }
            })//end key.map
            form = <div
                style={{
                    'padding': '20px',
                    'display': 'block',
                    'position': 'absolute',
                    'z-index': '1',
                    'top': '20%',
                    'left': '40%',
                    'backgroundColor': 'rgb(235, 237, 239 )',
                    'box-shadow': '5px 5px 5px gray'
                }}>
                <button
                    className="badge badge-secondary"
                    onClick={this.props.close}>x</button>

                <button
                    className="badge badge-info"
                    onClick={this.handleSave}
                >&#128190;Guardar</button>

                <ul>{inputs}</ul>
                <span className="text-muted">Ingresar los numeros usando coma(,) como separador de decimales</span>
                <hr />
                <b>Size:{' '}<span style={{'fontSize':'1.2rem'}}>{this.state.product.size}</span></b>{' '}
                <select name='size' onChange={this.handleChangeSelect} value={this.state.product.size}>
                    {this.state.tags.talla.map(size => <option value={size}>{size}</option>)}
                </select>
                
                <hr />
                <b>company:{' '}<span style={{'fontSize':'1.2rem'}}>
                {this.state.suppliers.filter(s=>s._id==this.state.product.supplier_id).length==0
                ?''
                :this.state.suppliers.filter(s=>s._id==this.state.product.supplier_id)[0].company
                /*this line is too long, because when do not find a coincidence*/
                }
                </span></b>{' '}
                <select  name="supplier_id" onChange={this.handleChangeSelect} >
                    {this.state.suppliers.map(s => <option value={s._id}>{s.company}</option>)}
                </select>
                
                <hr />
                <b>Tags:</b>
                <TagsForm
                    tags={this.state.product.tags || []}
                    deleteTag={this.handleTagDelete}
                    allowTags={this.state.tags || []}
                    handleAddTag={this.handleAddTag}
                />
                <hr />
                <b>Imgs:</b>
                <ImageForm
                    handleDeleteImage={this.handleDeleteImage}
                    handleAddImage={this.handleAddImage}
                    images={this.state.product.images || []}
                />
            </div>
        }
        return (
            <div>
                {form}

            </div>
        )
    }
}

import React, { Component } from 'react';
import TagsEditor from './general/tags-editor';
import BannerEditor from './general/banner-editor';



export default class General extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                tags: {},
                banner: {}
            }
        }


    }//end constructor

  
    render() {

        return (
            <div>
                <h2 className="text-primary">Configuración General:</h2>
                <hr />
                <span className='text-info'>
                    &#8505;Para actualizar en la Base de Datos es necesaio guardar!
                </span>
               <TagsEditor/>
               <hr/>
               <BannerEditor/>
            </div>
        )
    }
}
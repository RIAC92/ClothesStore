import axios from 'axios';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import { Domain } from '../../vars';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            option: 0,
            tags: {},
            all: 'true',//is a string becasue it's send in a url by get method
            open: false,
            querySearch: {}
        }

        this.selectCat = this.selectCat.bind(this);
        this.selectTag = this.selectTag.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickClear = this.handleClickClear.bind(this);

    }//end constructor

    componentDidMount() {
        axios.get(Domain+'/store/catalog/tags')
            .then(res => {
                console.log('res,  axios: ', res)
                this.setState({
                    tags:  res.data
                })
            })
            .catch(e => console.log('error:', e));

    }

    selectCat(event) {
        let option = event.target.options.selectedIndex
        console.log('Evento: ', option)
        if (option === 0) {
            this.setState({
                option: option,
                all: 'true',
                querySearch: {}
            });
        } else {
            this.setState({
                option: option,
            });
        }//end else

    }//end selectCat

    selectTag(event) {
        let id = event.target.id;
        let regex = /(?<=tag:)\w+/i;
        let tag = id.match(regex)[0];
        let tagsKeys = Object.keys(this.state.tags);
        let newQuerySearch = Object.assign({}, this.state.querySearch);
        newQuerySearch[tagsKeys[this.state.option - 1]] = tag;
        this.setState({
            all: 'false',
            querySearch: newQuerySearch
        })
        console.log(tag);
    }
    handleClick(event) {
        event.preventDefault();
        return this.props.onSearch(this.state.querySearch)
    }
    handleClickClear(event) {
        event.preventDefault();
        this.setState({
            all: 'true',
            querySearch:{},
            open:false
        },()=>this.props.onSearch(this.state.querySearch))
        
    }
    render() {
        let tagsKeys = Object.keys(this.state.tags)
        let options = tagsKeys.map((tag, index) => {
            return <option
                value={(index + 1).toString()}
                key={index.toString() + '-' + tag}
            >
                {tag}
            </option>

        })//end map
        let radioButons = null;
        if (this.state.option !== 0) {
            radioButons = this.state.tags[tagsKeys[this.state.option - 1]].map((tag, index) => {
                return <Form.Check
                    type="radio"
                    key={"radio-" + tag + index.toString()}
                    id={'tag:' + tag}
                    name="tag-option"
                    label={tag}
                    onClick={this.selectTag}
                />
            })
        } else {
            radioButons = <div></div>;
        }
        return (
            <div >
                <Button

                    onClick={() => {
                        this.setState({
                            open: !this.state.open
                        })
                    }}
                >
                    Filtros
                </Button>

                <Collapse in={this.state.open}>
                    <Form>
                        <Form.Group style={{ 'width': '100%' }}>
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                style={{ 'width': '40%' }}
                                as="select"
                                size="sm"
                                onChange={this.selectCat}
                            >
                                <option value="0">todos</option>
                                {options}

                            </Form.Control>


                            <Form.Text className="text-muted">
                                selecciona una categoria
                            </Form.Text>

                            <SearchText
                                all={this.state.all}
                                querySearch={this.state.querySearch}
                            />

                            <fieldset>
                                {radioButons}

                            </fieldset>
                        </Form.Group>

                        <Button
                            id="search-btn"
                           variant="success"
                            onClick={this.handleClick}
                        >
                            buscar
                        </Button>
                        {' '}
                        <Button
                            id="clear-btn"
                           variant="warning"
                            onClick={this.handleClickClear}
                        >
                            limpiar filtros
                        </Button>

                    </Form>


                </Collapse>



            </div>
        )
    }
}


function SearchText(props) {
    let message = ''
    if (props.all === 'true') {
        message = 'Todos los productos'
    } else {
        let queryKeys = Object.keys(props.querySearch);
        let textArr = queryKeys.map(key => `${key}: ${props.querySearch[key]}`);
        message = textArr.join(', ')
    }
    return (
        <span className="text-info"> <b>Buscar:</b> <em>{message}</em></span>
    );
}

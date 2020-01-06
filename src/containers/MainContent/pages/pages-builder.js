import React, { Component } from 'react';
import { activateAuthLayout } from '../../../store/actions';
import { connect } from 'react-redux';
import Settingmenu from '../Subpages/Settingmenu';
import { Link } from 'react-router-dom';

import Board from '../../../components/Builder';


const board = {
    areas: [
      {
        id: 1,
        name: 'area1',
        title: 'Area 1',
        modules: [
          {
            id: 1,                        
            component: 'Foo',
            fields: {
              title: 'Title module 1',
              subtitle: 'Subtitle module 1'
            }        
          },
          {
            id: 2,                        
            component: 'Bar',
            fields: {
              title: 'Title module 2',
              subtitle: 'Subtitle module 2',
              "tasks": [
                {
                  "title": "My first task",
                  "details": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  "done": true
                },
                {
                  "title": "My second task",
                  "details": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
                  "done": false
                }
              ]
            }          
          }          
        ]
      },
      {
        id: 2,
        name: 'area2',
        title: 'Area 2',
        modules: [
          {
            id: 3,                        
            component: 'Foo',            
            fields: {
              title: 'Title module 3',
              subtitle: 'Subtitle module 3'
            }         
          }
        ]
      },
      {
        id: 3,
        name: 'area3',
        title: 'Area 3',
        modules: [          
        ]
      }
    ]
  }

  
class PagesBuilder extends Component {

    componentDidMount() {
        this.props.activateAuthLayout();
    }

    render() {

        return (
            <React.Fragment>
                <div className="content">
                    <div className="container-fluid">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-sm-6">
                                    <h4 className="page-title">Builder</h4>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="#"><i className="mdi mdi-home-outline"></i></Link></li>
                                        <li className="breadcrumb-item"><Link to="#">Page Name</Link></li>
                                        <li className="breadcrumb-item active">Builder</li>
                                    </ol>
                                </div>
                                <div className="col-sm-6">
                                    <div className="float-right d-none d-md-block">
                                        <Settingmenu />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Board                                                                
                            onModuleRemove={console.log}
                            onModuleEdit={console.log}
                            onModuleAdded={console.log}
                            onModuleDragEnd={console.log}                     
                            initialBoard={board}
                        />
                    
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(null, { activateAuthLayout })(PagesBuilder);



import React from 'react';
import { Row, Col, Alert } from 'reactstrap';

import { Input, Tags, TextArea, ImageUpload } from '../../../../../../components/Form';
import { parseBackendValidations } from '../../../../../../helpers/validation';

export default function MetaCard ({ handleInputChange, handleInputBlur, form, validationStatus, tags, validationSchema }) {

    const isRequired = (field) => (validationSchema[field] && validationSchema[field].required) ? true : false

    if(!form) return(<Alert color="danger" className="bg-white border border-danger">Couldn't get post info</Alert>)

    return (             
        <Row>
            <Col xl="4" lg="6" sm="12">
                <Input
                    name="meta_title" 
                    label="Title" 
                    onChange={handleInputChange} 
                    onBlur={handleInputBlur} 
                    value={form.meta_title || ''}
                    isInvalid={validationStatus.meta_title.invalid}
                    message={validationStatus.meta_title.message}
                    required={isRequired('meta_title')}
                />
                <Tags 
                    name="meta_keywords" 
                    label="Keywords" 
                    onChange={handleInputBlur}                             
                    value={form.meta_keywords || []}
                    options={tags}
                    isInvalid={validationStatus.meta_keywords.invalid}
                    message={validationStatus.meta_keywords.message}
                    required={isRequired('meta_keywords')}
                />
                <TextArea
                    name="meta_description" 
                    label="Description" 
                    rows="4"
                    onChange={handleInputChange} 
                    onBlur={handleInputBlur} 
                    value={form.meta_description || ''}
                    isInvalid={validationStatus.meta_description.invalid}
                    message={validationStatus.meta_description.message}
                    required={isRequired('meta_description')}
                />                                        
            </Col>
            <Col xl="4" lg="6" sm="12">
                
                {/* <FileUpload 
                    name="meta_image"
                    label="Cover Image"
                    key='ex1' 
                    url='http://localhost:3333/api/v1/storage/file/upload'
                    method='post'
                    backendValidations={parseBackendValidations(['meta_image'], false, validationSchema)}                   
                    // onProgress={(e, request, progress) => {console.log('progress', name, progress);}}
                    onChange={handleInputBlur}
                    value={form.meta_image || {}}
                    required={isRequired('meta_image')}
                    // onError={ (e, request) => {console.log('error', e, request);}}
                    // onAbort={ (e, request) => {console.log('abort', e, request);}}                    
                    // isInvalid={false}
                    // message="validationStatus.meta_keywords.message"
                /> */}

                <ImageUpload 
                    name="meta_image"
                    label="Cover Image"
                    url='http://localhost:3333/api/v1/storage/image/upload'
                    method='post'
                    backendValidations={parseBackendValidations(['meta_image'], false, validationSchema)}                   
                    // onProgress={(e, request, progress) => {console.log('progress', name, progress);}}
                    onChange={handleInputBlur}
                    value={form.meta_image || {}}
                    required={isRequired('meta_image')}
                    // onError={ (e, request) => {console.log('error', e, request);}}
                    // onAbort={ (e, request) => {console.log('abort', e, request);}}                    
                    // isInvalid={false}
                    // message="validationStatus.meta_keywords.message"
                />
                
            </Col>
        </Row>      
    )

}
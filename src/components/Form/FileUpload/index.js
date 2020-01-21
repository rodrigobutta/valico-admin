import { EventEmitter } from "events";
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { Progress, Button, Row, Col } from 'reactstrap';


const FileUpload = ({label, name, className, isInvalid, isValid, message, url, method, onProgress, onChange, onError, onAbort, remoteValidations={}, ...props}) => {

    const [ progress, setProgress ] = useState(-1)
    const [ hasError, setHasError ] = useState(false)
    const [ error, setError ] = useState(null)

    const proxy = new EventEmitter();
    
    const inputRef = useRef(null)  

    const callOnProgress = (e, req, prog) => (typeof(onProgress) === 'function') ? onProgress(e, req, prog) : false
    

    const cancelUpload = () => {
        console.log('cancelUpload')

        proxy.emit("abort");

        // req.abort()

        setProgress(-1)        
        setHasError(false)

    }

    const handleOpenDialog = () => {
        inputRef.current.click()   
    }

    const handleFileSelected = () => {

        setProgress(0)        
        setHasError(false)

        doUpload()

    }

    const doUpload = () => {

        const data = new FormData();
        const req = new XMLHttpRequest();

        data.append("file", inputRef.current.files[0]);
        data.append("validations", JSON.stringify(remoteValidations));

        req.open(method, url);

        proxy.once("abort", () => {
            console.log('proxy abort')
            req.abort();
        });

        addRequestBinds(req)

        req.send(data);
        
    }

    const addRequestBinds = (req) => {
            
        req.addEventListener("load", e => {

            proxy.removeAllListeners(["abort"]);
            
            if (req.status >= 200 && req.status <= 299) { // OK
            
                setProgress(100)        
                setHasError(false)

                onChange(e, req);

            }
            else if(req.status === 422){ // Validation

                const response = JSON.parse(req.response)

                setProgress(-1)        
                setHasError(true)
                setError(response.message)

                onError(e, req);

            }
            else { // Error
                
                setProgress(100)        
                setHasError(true)

                onError(e, req);

            }
            
        }, false);

        req.addEventListener("error", e => {
            
            console.log('error', e)

            setHasError(true)
            onError(e, req);

        }, false);

        req.upload.addEventListener("progress", e => {
            
            const prog = (e.total !== 0) ? parseInt((e.loaded / e.total) * 100, 10) : 0
            
            setProgress(prog)        
            callOnProgress(e, req, prog);

        }, false);


        req.addEventListener("abort", e => {
            console.log('req abort')

            setProgress(-1)   
            onAbort(e, req);

        }, false);

    }


    const inputClass = className + " form-control" + ((isValid || hasError) ? " is-valid" : "") + ((isInvalid || hasError) ? " is-invalid" : "") 

    return (
        <>
            <div className="form-group position-relative">
                {label ? <label>{label}</label> : null}           
                <Row>
                    <Col sm="8">
                        <input                                                 
                            type="text"                
                            defaultValue="some-file-name.pdf"
                            className={inputClass} 
                            disabled={true}
                        />
                        {isValid && message !== '' && <div className="valid-tooltip">{message}</div>}
                        {isInvalid && message !== '' && <div className="invalid-tooltip">{message}</div>}
                        {hasError && <div className="invalid-tooltip">{error || "Failed to upload"}</div>}
                        {progress > -1 && progress <= 100 && !isInvalid && !isValid ? 
                            <Progress className="mt-2" style={{ height: '5px' }} color={progress===100?"success":"purple"} value={progress} />   
                            :
                            null
                        }
                    </Col>                
                    <Col sm="4">
                        
                        {progress > -1 && progress < 100 ?                                                                                                
                            <Button color="danger"
                                onClick={cancelUpload} >
                                <i className="mdi mdi-cancel mr-2"></i>Cancel
                            </Button>                                          
                        :
                            <Button color="secondary"
                                onClick={handleOpenDialog} >
                                <i className="mdi mdi-file-upload mr-2"></i>Select
                            </Button>  
                        }
                        
                    </Col>
                </Row>
                

            </div>
            
            <input 
                type="file" 
                name={name ? name : 'file'}
                ref={inputRef}
                onChange={handleFileSelected}
                style={{display:'none'}}
            />
            
        </>
    )

}

FileUpload.propTypes = {
    url: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,    
    onProgress: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    onAbort: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    isValid: PropTypes.bool,
    isInvalid: PropTypes.bool,
    message: PropTypes.string,
    className: PropTypes.string,    
};

export default FileUpload;
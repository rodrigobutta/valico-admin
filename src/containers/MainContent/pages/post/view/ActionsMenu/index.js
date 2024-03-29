import React from 'react'
import { Button, ButtonGroup } from 'reactstrap';

import ButtonWithLoading from '../../../../../../components/ButtonWithLoading'


export default function ActionsMenu({     
    onClickSave,
    onClickUndo,
    onClickRedo,
    onClickClear,
    // onClickBuilder,
    canRedo,
    canUndo,
    canClear,
    canSave,
    savingPost,
    saveLabel
}) {    
    return (
        <>
            <div className="float-right d-none d-md-block">
                <div className="btn-toolbar " role="toolbar" aria-label="Toolbar">                    
                    <ButtonGroup className="mt-2 mt-xl-0 btn-sm">
                        <ButtonWithLoading color="primary" 
                            iconClass="mdi mdi-content-save"
                            isLoading={savingPost} 
                            onClick={onClickSave} 
                            disabled={!canSave}>
                            {saveLabel}
                        </ButtonWithLoading>                       
                    </ButtonGroup>
                    <ButtonGroup className="mt-2 mt-xl-0 btn-sm">
                        <Button color="danger" 
                            onClick={onClickClear}
                            disabled={!canClear}>
                            <i className="mdi mdi-backup-restore"></i>
                        </Button>
                        <Button color="secondary" 
                            onClick={onClickUndo}
                            disabled={!canUndo}>
                            <i className="mdi mdi-undo"></i>
                        </Button>
                        <Button color="secondary"
                            onClick={onClickRedo}
                            disabled={!canRedo}>
                            <i className="mdi mdi-redo"></i>
                        </Button>                                            
                    </ButtonGroup>     
                    {/* <ButtonGroup className="mt-2 mt-xl-0 btn-sm">
                        <Button color="primary"
                            onClick={onClickBuilder} >
                            <i className="mdi mdi-config mr-2"></i>Builder
                        </Button>
                    </ButtonGroup> */}
                </div>                        
            </div>            
        </>
    )
}
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
// import { useHistory } from "react-router";
import Hotkeys from 'react-hot-keys';

import { activateAuthLayout, getViewPost,  saveViewPost } from "../../../../../store/actions";
import Breadcrumb from "../_common/Breadcrumb";
import ActionsMenu from "./ActionsMenu";
import Board from '../../../../../components/Board'

import { useBack, SET, RESET } from '../../../../../hooks/useBack'


function backReducer(state, action) {
  switch (action.type) {
    case SET:
      console.log('SET', action.payload.content[0].modules[0].fields)
      return { post: action.payload }
    case RESET:
      console.log('RESET', action.payload.content[0].modules[0].fields)
      return { post: action.payload }         
    default:
      throw new Error(`Unknown action ${action.type}`)
  }
}



function PostBuilder() {

  // const location = useLocation();
  // const history = useHistory();

  const post = useSelector(s => s.post.viewPost);
  const loadingPost = useSelector(s => s.post.loadingViewPost);
  const savingPost = useSelector(s => s.post.savingPost);
  const dispatch = useDispatch();

  const { state, canUndo, canRedo, undoState, redoState, setState, resetState } = useBack(backReducer,{})
  
  let { id } = useParams();


  useEffect(() => {
		dispatch(getViewPost(id));	
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    dispatch(activateAuthLayout());
  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	useEffect(() => { 
    if(post) resetState(post)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const handleChangeTemplate = (t) => setState({...state.post, template: t}) 
	const handlePostUpdate = (updatedPost) => setState(updatedPost)
  const handleClickUndo = () => undoState()
	const handleClickRedo = () => redoState()
  const handleClickClear = () => resetState(post)
  
  const handlePostSave = () => dispatch(saveViewPost(state.post))		


  // const handleClickView = () => history.push('/posts/'+id+'/view')    
  
  
  const onKeyDown = (keyName, e, handle) => {
    // console.log("test:onKeyDown", keyName, e, handle)    
    switch (keyName) {
      case "ctrl+z":
        handleClickUndo();
        break;
      case "ctrl+shift+z":
        handleClickRedo();
        break;
      case "ctrl+s":
        handleClickClear();
        break;
      default:
        break;
    }
    
  }

  return (
    <>
    <Hotkeys 
        keyName="shift+a,alt+s,ctrl+s,ctrl+z" 
        onKeyDown={onKeyDown}       
      >
        <div className="content">
          <div className="container-fluid">
            <div className="post-title-box">
              <Row className="align-items-center">
                <Col sm="6">
                  <h4 className="page-title">
                    {state.post ? state.post.name : "..."}
                    {" "}<sup>({state.post && state.post._revision? state.post._revision : 0})</sup>
                  </h4>
                  <Breadcrumb post={state.post} action={"Builder"} />
                </Col>
                <Col sm="6">
                  <div className="float-right d-none d-md-block">
                    {!loadingPost && state.post ? (
                      <ActionsMenu 
                        currentTemplate={state.post.template}
                        onChangeTemplate={handleChangeTemplate}
                        onClickSave={handlePostSave}
                        onClickUndo={handleClickUndo}
                        onClickRedo={handleClickRedo}
                        onClickClear={handleClickClear}
                        // onClickView={handleClickView}
                        canRedo={canRedo}
                        canUndo={canUndo}
                        canClear={canUndo}
                        savingPost={savingPost}
                      />
                    ) : null}
                  </div>
                </Col>
              </Row>
            </div>

            <Row>
              <Col>
                {!loadingPost && state.post ? (
                  <Board
                    onPostUpdated={handlePostUpdate}                  
                    post={state.post}									
                  />
                ) : null}
              </Col>
            </Row>
          </div>
        </div>

        
        
      </Hotkeys>
    </>
  );
}

export default PostBuilder;
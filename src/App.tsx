import React, { useEffect, useState } from 'react';
import { Container, Header, Form, TextArea } from 'semantic-ui-react';
import './App.css';
import './assets/fomantic/dist/semantic.css';

const commentsFromLocalStorage = JSON.parse(localStorage.getItem("comments") || '[]');

const App: React.FC = () => {

  //ToDo: Below can be divided into different components

  interface CommentFormState {
    newComment: string;
    existingComments: string[];
  }

  const [state, setState] = useState<CommentFormState>({
    newComment: '',
    existingComments: commentsFromLocalStorage,
  });

  useEffect(() => {
    //ToDo: Currently just stores to localStorage could change this to flatfile or other DB?
    localStorage.setItem("comments", JSON.stringify(state.existingComments));
  }, [state.existingComments]);

  const addComment = () => {
    setState({
      existingComments: [...state.existingComments, state.newComment],
      newComment: '',
    })
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key: string = event.target.name;
    const value: string = event.target.value;
    setState((prevState) => {
      return{
        ...prevState,
        [key]: value,
      };
    });
  }

  return (
    <>
    <Container>
      <Header>
        Add a Comment
      </Header>
      <Form onSubmit={addComment}>
            <Form.Input
                placeholder='Type a comment...'
                value={state.newComment}
                onChange={onChange}
                name='newComment'
                required={true}
            />
            <Form.Button
                positive={true}
                type='submit'
                content='Add Comment'
            />
        </Form>
        <>
        {state.existingComments.map((c) => {
          //ToDo: Add key here to get rid of console error
            return( 
              <TextArea>{c}</TextArea>
            );
            
        })}
        </>
    </Container>
    </>
  );
}

export default App;

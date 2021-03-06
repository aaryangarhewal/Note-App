import React from 'react';
import SidebarComponent from '../sidebar/sidebar';
import EditorComponent from '../editor/editor';
import HeaderComponent from '../MyComponents/Header';
import {Footer} from '../MyComponents/Footer';
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import '../App.css';

import firebase from 'firebase';
//const firebase = require('firebase');

class DashboardComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
      user: ""
    };
  }

  render() {
    return(
      
        <div className="app-container">
          <HeaderComponent
          user={this.state.user}
          >
          </HeaderComponent>
            <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
          user={this.state.user}></SidebarComponent>
        {
          this.state.selectedNote ?
          <EditorComponent selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          noteUpdate={this.noteUpdate}></EditorComponent> :
          null
        }<Footer/>
            </div>
    );
  }

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(async user=> {
        if(!user){
            this.props.history.push("/login");
        }else{
          firebase
              .firestore()
              .collection('notes')
              .where("user", "==" , firebase.auth().currentUser.email)
              .onSnapshot(async serverUpdate => {
              const notes = serverUpdate.docs.map(_doc => {
                  const data = _doc.data();
                  data['id'] = _doc.id ;
                  return data;
              });
              await this.setState({
                  notes: notes,
                  user: firebase.auth().currentUser.email
              });
          });
        }
      });
}

selectNote = (note, index) => this.setState({selectedNoteIndex: index, selectedNote: note});

noteUpdate = (id, noteObj) => {
  firebase
    .firestore()
    .collection('notes')
    .doc(id)
    .update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: firebase.auth().currentUser.email
    });
}

newNote = async (title) => {
  const note = {
    title: title,
    body: ''
  };
  const newFromDB = await firebase
    .firestore()
    .collection('notes')
    .add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: firebase.auth().currentUser.email
    });

    const newID = newFromDB.id;
    await this.setState({notes: [...this.state.notes, note]});
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0])
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
}

deleteNote = async (note) => {
  const noteIndex = this.state.notes.indexOf(note);
  await this.setState({notes: this.state.notes.filter(_note => _note!== note)});
  
  if(this.state.notes.length >= 1) {
    this.state.selectedNoteIndex < noteIndex ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex], this.state.selectedNoteIndex) :
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1)
  }
  else {
      this.setState({ selectedNote: null, selectedNoteIndex: null })
  }

  firebase
    .firestore()
    .collection('notes')
    .doc(note.id)
    .delete();
}

signOut = () => {
  firebase.auth().signOut();
};
}

export default withStyles(styles)(DashboardComponent);
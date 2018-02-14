import React, { Component } from 'react'
import { Collection, CollectionItem } from 'react-materialize'
import { observer } from 'mobx-react'

import { CodeSectionStore } from './code-section-store'

@observer
export class CodeSection extends Component {
  
    store
  
    constructor(props) {
      super(props)
      this.store = new CodeSectionStore(props.repo)
    }
  
    render() {
      return (
        <div className="code section">
            <Collection header="/">
              {this.store.files.map(file => 
                <CollectionItem href="#" key={file}>{file}</CollectionItem>
              )}
            </Collection>
        </div>
      )
    }
  }

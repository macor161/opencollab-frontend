import React, { Component } from 'react'
import { createRepo, list } from '../../lib/repo'
import { observer } from 'mobx-react'
import { HomeStore } from './home-store'
//import fs from 'fs'

const store = new HomeStore()


@observer
class Home extends Component {
	constructor(props) {
		super(props)

		//fs.mkdir('toto')
		/*
		createRepo({ name: 'test-repo', description: 'this is a test repo' })
		.then(result => console.log('good'))
		.catch(e => console.log('error ', e))*/

		
		list()
		.then(result => console.log(result))
		.catch(e => console.log('error: ', e))
		
		setTimeout(() => store.test = 'tawefeaw', 5000)

	}

	render() {
		return(
			<div>
				home2 {store.test}
			</div>
		)
	}
}

export default Home
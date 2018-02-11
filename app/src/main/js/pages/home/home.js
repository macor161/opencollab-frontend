import React, { Component } from 'react'
import { createRepo, list } from '../../lib/repo'
//import fs from 'fs'


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
		
	}

	render() {
		return(
			<div>
				home2
			</div>
		)
	}
}

export default Home
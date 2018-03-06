import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Card, Icon } from 'react-materialize'
import { Intertron } from '../../lib/intertron-client'

import { HomeStore } from './home-store'

import './home.css'

@observer class Home extends Component {

	store

	constructor(props) {
		super(props)

		this.store = new HomeStore()
		window.homeStore = this.store
	}

	render() {
		return (
			<div className="home page">
				<div className="container container-md">
					<h2>My Repositories</h2>
					<br />
					{this.store.repos.map((repo, i) =>
						<Card
							key={repo.name}
							actions={[
								<Link key="view" to={`/repo/${repo.name}`}>View repository</Link>,
								<Link key="issues" to={`/repo/${repo.name}/issues`}>{repo.issueCount.toString()} issues</Link>
							]}>
							<span className="card-title">
								{repo.name}
								<Icon className="star-btn">ic_star_border</Icon>
							</span>
							<div className="content">
								{repo.description}
							</div>
						</Card>
					)}

				</div>
			</div>
		)
	}
}



if (typeof window.web3 !== 'undefined') {
	window.web3 = new Web3(window.web3.currentProvider);
} else {
	// Other provider
	window.web3 = new Web3(new Web3.providers.HttpProvider('yourOtherProvider'));
}

function isElectron() {
	if (chrome.ipcRenderer) return true;
	return false;
}

function sendToElectron(message) {
	chrome.ipcRenderer.send(message);
}

function openMetamaskPopup() {
	sendToElectron('open-metamask-popup');
}

function closeMetamaskPopup() {
	sendToElectron('close-metamask-popup');
}

function openMetamaskNotification() {
	sendToElectron('open-metamask-notification');
}

function closeMetamaskNotification() {
	sendToElectron('close-metamask-notification');
}

function sendEther(contractFunction) {
	web3.eth.sendTransaction({
		to: '0x8f6c0c887F7CAF7D512C964eA2a3e668D94C5304',
		value: '1000000000000'
	}, (err, res) => {
		if (err) closeMetamaskNotification();
		if (res) closeMetamaskNotification();
	});

	setTimeout(() => {
		openMetamaskNotification();
		openMetamaskPopup()
	}, 500);
}

setTimeout(async () => {
	openMetamaskPopup()

	console.log('test intertron')
	var ipc = new Intertron(chrome.ipcRenderer)
	let a = await ipc.send('testIpc.toto', { allo: 123 })
	console.log('response: ', a)

}, 500);

export default Home
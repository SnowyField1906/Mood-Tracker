import { useState } from 'react'
import { turnOnWeb3 } from './provider/index'
import Home from './pages/Home'

function App() {
	const [auth, setAuth] = useState({
		demo: false,
		web3: false
	})

	return (
		<>
			<div className='absolute left-4 bottom-4 flex justify-start'>
				{!auth.web3 && <button className='mx-3 border-2 rounded-xl px-2 py-1 text-white bg-green-400 hover:bg-green-600' onClick={() =>
						turnOnWeb3().then(() =>
							setAuth({ demo: false, web3: true }))
						}
					>Use Web3</button>
				}
				{!auth.demo && <button className='mx-3 border-2 rounded-xl px-2 py-1 text-white bg-yellow-400 hover:bg-yellow-600' onClick={() =>
						setAuth({ demo: true, web3: false })
					}>Use Demo</button>
				}
			</div>
			
			{(auth.demo || auth.web3) && <Home auth={auth} />}

			<p className='absolute right-4 bottom-4 ilalic text-sm text-gray-400'>*Based on&nbsp;
				<a className='ilalic text-sm cursor-pointer text-gray-600 bold hover:underline hover:text-blue-600'
					href='https://www.unixtimestamp.com/' target="_blank" rel="noreferrer">timestamp</a>
				, the app will not support years before 1970.
			</p>
		</>
	)
}

export default App;
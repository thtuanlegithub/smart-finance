import React from "react";
import Root from "./src/Root";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { Host } from 'react-native-portalize';

function App(props) {
	return (
		<Provider store={store}>
			<Host>
				<Root />
			</Host>
		</Provider>
	);
}

export default App;
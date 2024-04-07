import React from "react";
import Root from "./src/Root";
import { Provider } from "react-redux";
import store from "./src/redux/store";

function App(props) {
	return (
		<Provider store={store}>
			<Root />
		</Provider>
	);
}

export default App;
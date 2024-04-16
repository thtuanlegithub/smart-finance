import React, { useEffect, useState} from "react";
import Root from "./src/Root";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { Host } from 'react-native-portalize';
import NetInfo from "@react-native-community/netinfo";
import NoWifiItem from "./src/components/NoWifiItem";

function App(props) {
    const [isConnected, setIsConnected] = useState(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

	return (
		<Provider store={store}>
			<Host>
                {isConnected === false ? <NoWifiItem /> : <Root />}
			</Host>
		</Provider>
	);
}

export default App;
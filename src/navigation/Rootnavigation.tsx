import AddressScreen from "../screens/AddressScreen";
import NameScreen from "../screens/NameScreen";
import PhoneVerification from "../screens/PhoneVerification";
import RegisterScreen from "../screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export type RootStackParamList = {
    Login: undefined;
    Verify: undefined;
    Name: undefined;
    Address: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={RegisterScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Verify" component={PhoneVerification} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Name" component={NameScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Address" component={AddressScreen} options={{ animation: 'slide_from_right' }} />
        </Stack.Navigator>
    );
}

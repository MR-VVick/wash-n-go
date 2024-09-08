import { createNavigationContainerRef } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Flash: undefined;
    SignUp: undefined;
    SignIn: undefined;
    Home: undefined;
};

export type FlashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Flash'>;
export type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
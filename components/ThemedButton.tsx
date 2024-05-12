import { Button } from "react-native";


export default function ThemedButton({ text }) {
    return (
        <Button
        title={text}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    );
}
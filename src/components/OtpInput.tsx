import React, { useRef, useState } from 'react';
import { TextInput, View, NativeEventEmitter, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

interface OtpInputProps {
  numberOfDigits?: number;
  onTextChange?: (text: string) => void;
  onFilled?: (text: string) => void;
  placeholder?: string;
  type?: 'numeric' | 'default';
}

export const OtpInput: React.FC<OtpInputProps> = ({
  numberOfDigits = 6,
  onTextChange,
  onFilled,
  placeholder = '',
  type = 'numeric',
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(numberOfDigits).fill(''));
  const inputs = useRef<TextInput[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    // Handle pasting or multiple chars (though mostly handled by individual inputs)
    const sanitizedText = text.slice(-1);
    newOtp[index] = sanitizedText;
    setOtp(newOtp);

    const combinedOtp = newOtp.join('');
    onTextChange?.(combinedOtp);

    if (sanitizedText && index < numberOfDigits - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== '') && combinedOtp.length === numberOfDigits) {
      onFilled?.(combinedOtp);
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-row items-center justify-between w-full gap-x-2">
      {new Array(numberOfDigits).fill(0).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            if (ref) inputs.current[index] = ref;
          }}
          className={`h-14 w-12 rounded-xl border-2 bg-slate-50 text-center text-xl font-bold text-slate-900 shadow-sm
            ${otp[index] ? 'border-sky-500 bg-white' : 'border-slate-200'}`}
          maxLength={1}
          keyboardType={type === 'numeric' ? 'number-pad' : 'default'}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          value={otp[index]}
          placeholder={placeholder[index] || ''}
          placeholderTextColor="#cbd5e1"
          autoFocus={index === 0}
          selectionColor="#0ea5e9"
        />
      ))}
    </View>
  );
};

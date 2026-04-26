import React, { useMemo, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

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
  const [otpValue, setOtpValue] = useState('');
  const inputRef = useRef<TextInput>(null);
  const otp = useMemo(
    () => Array.from({ length: numberOfDigits }, (_, index) => otpValue[index] ?? ''),
    [numberOfDigits, otpValue]
  );

  const handleChangeText = (text: string) => {
    const sanitized = text.replace(/\D/g, '').slice(0, numberOfDigits);
    setOtpValue(sanitized);
    onTextChange?.(sanitized);
    if (sanitized.length === numberOfDigits) {
      onFilled?.(sanitized);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Pressable onPress={focusInput} className="w-full">
      <View className="flex-row items-center justify-between w-full gap-x-2">
        {new Array(numberOfDigits).fill(0).map((_, index) => (
          <View
          key={index}
          className={`h-14 w-12 rounded-xl border-2 bg-slate-50 text-center text-xl font-bold text-slate-900 shadow-sm
            ${otp[index] ? 'border-sky-500 bg-white' : 'border-slate-200'}`}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Text className={`text-xl font-bold ${otp[index] ? 'text-slate-900' : 'text-slate-300'}`}>
            {otp[index] || placeholder[index] || ''}
          </Text>
        </View>
        ))}
      </View>
      <TextInput
        ref={inputRef}
        value={otpValue}
        onChangeText={handleChangeText}
        keyboardType={type === 'numeric' ? 'number-pad' : 'default'}
        maxLength={numberOfDigits}
        autoFocus
        textContentType="oneTimeCode"
        caretHidden
        style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
      />
    </Pressable>
  );
};

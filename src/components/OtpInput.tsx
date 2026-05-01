import React, { useEffect, useMemo, useRef, useState } from 'react';
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

  useEffect(() => {
    const id = setTimeout(() => {
      inputRef.current?.focus();
    }, 120);
    return () => clearTimeout(id);
  }, []);

  const handleChangeText = (text: string) => {
    const sanitized = type === 'numeric' ? text.replace(/\D/g, '') : text;
    const trimmed = sanitized.slice(0, numberOfDigits);
    setOtpValue(trimmed);
    onTextChange?.(trimmed);
    if (trimmed.length === numberOfDigits) {
      onFilled?.(trimmed);
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
          className={`h-14 w-12 rounded-xl border bg-black/35 text-center text-xl font-bold text-white shadow-sm
          ${otp[index] ? 'border-orange-400 bg-white/10' : 'border-white/15'}`}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Text className={`text-xl font-bold ${otp[index] ? 'text-white' : 'text-white/35'}`}>
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
        blurOnSubmit={false}
        textContentType="oneTimeCode"
        selectionColor="#f97316"
        style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
      />
    </Pressable>
  );
};

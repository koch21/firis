import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const RadioButton = ({ options, selectedOption, onSelect }) => {
  return (
    <>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}
          onPress={() => onSelect(option.value)}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: option.value === selectedOption ? '#7b4e91' : '#7b4e91',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            {option.value === selectedOption && (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: '#7b4e91',
                }}
              />
            )}
          </View>
          <Text>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default RadioButton;
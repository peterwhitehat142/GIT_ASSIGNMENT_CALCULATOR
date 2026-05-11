import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstValue, setFirstValue] = useState('');
  const [operator, setOperator] = useState('');
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForSecond) {
      setDisplay(num);
      setWaitingForSecond(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setFirstValue(display);
    setOperator(op);
    setWaitingForSecond(true);
  };

  const handleEquals = () => {
    const a = parseFloat(firstValue);
    const b = parseFloat(display);
    let result = 0;
    if (operator === '+') result = a + b;
    if (operator === '-') result = a - b;
    if (operator === '×') result = a * b;
    if (operator === '÷') result = b !== 0 ? a / b : 0;
    setDisplay(String(result));
    setOperator('');
    setFirstValue('');
    setWaitingForSecond(false);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstValue('');
    setOperator('');
    setWaitingForSecond(false);
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const isOperator = (val: string) => ['÷', '×', '-', '+', '='].includes(val);

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display}</Text>
      {buttons.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((btn) => (
            <TouchableOpacity
              key={btn}
              style={[
                styles.button,
                btn === '0' && styles.zeroButton,
                isOperator(btn) && styles.operatorButton,
                btn === 'C' && styles.clearButton,
              ]}
              onPress={() => {
                if (btn === 'C') handleClear();
                else if (isOperator(btn) && btn !== '=') handleOperator(btn);
                else if (btn === '=') handleEquals();
                else handleNumber(btn);
              }}
            >
              <Text style={[styles.buttonText, isOperator(btn) && styles.operatorText]}>
                {btn}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'flex-end', padding: 16 },
  display: { color: '#fff', fontSize: 72, textAlign: 'right', marginBottom: 20, paddingRight: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  button: {
    backgroundColor: '#333',
    borderRadius: 50,
    width: 80, height: 80,
    alignItems: 'center', justifyContent: 'center',
  },
  zeroButton: { width: 172, alignItems: 'flex-start', paddingLeft: 28 },
  operatorButton: { backgroundColor: '#f1a33c' },
  clearButton: { backgroundColor: '#a5a5a5' },
  buttonText: { color: '#fff', fontSize: 32 },
  operatorText: { color: '#fff' },
});
const greetThee = [
  'Hello',
  'Hi',
  'Hi there',
  'Hola',
  'Hallo',
  'Salut',
  'Guten tag',
  '你好',
  '안녕',
  'こんにちは',
  'S̄wạs̄dī',
  "Olá"
]

export const randomGreeting = (): string => greetThee[Math.floor(Math.random() * greetThee.length)]
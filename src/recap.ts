const myName = 'Arian Josafat';
const myAge = 22;

const suma = (a: number, b: number) => {
  return a + b;
};

suma(12, 12);

class Persona {
  constructor(private name: string, private age: number) {
    this.name = name;
    this.age = age;
  }

  getSummary() {
    return `My name is ${this.name} and I am ${this.age} years old`;
  }
}

const persona = new Persona('Arian', 22);
persona.getSummary();

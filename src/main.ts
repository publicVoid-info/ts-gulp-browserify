import { Student, Person } from './student';

function greeter(person: Person) {
  return `Hello, ${person.firstName} ${person.lastName}`;
}

document.querySelector('#greeting').textContent = greeter(
  new Student('Jane', 'opa', 'Doe')
);

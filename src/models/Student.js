import uuid from 'uuid';
import DBManager from '../managers/DBManager';

const studentSchema = {
  id: {
    type: String,
    hashKey: true
  },
  firstName: String,
  lastName: String,
  major: String,
  semester: Number,
  createdAt: String,
  updatedAt: String
};

export default class Student extends DBManager {
  static updatableAttributes = ['firstName', 'lastName', 'major', 'semester'];

  id;

  firstName;

  lastName;

  major;

  semester;

  createdAt;

  updatedAt;

  constructor(id, firstName, lastName, major, semester, createdAt, updatedAt) {
    super(process.env.STUDENTS_TABLE, studentSchema);

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.major = major;
    this.semester = semester;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toDBFormat() {
    return {
      ...this,
      updatedAt: this.updatedAt.toString(),
      createdAt: this.createdAt.toString()
    };
  }

  getKey() {
    return this.id;
  }

  // eslint-disable-next-line class-methods-use-this
  fromDBResponse(item) {
    const {
      id,
      firstName,
      lastName,
      major,
      semester,
      createdAt,
      updatedAt
    } = item;

    return new Student(
      id,
      firstName,
      lastName,
      major,
      semester,
      createdAt,
      updatedAt
    );
  }

  static newStudent(firstName, lastName, major, semester) {
    const id = uuid();
    return new Student(
      id,
      firstName,
      lastName,
      major,
      semester,
      new Date(),
      new Date()
    );
  }
}

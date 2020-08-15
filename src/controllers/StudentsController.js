import { OK, NOT_FOUND } from 'http-status-codes';
import Controller from './BaseController';
import Student from '../models/Student';
import { respond } from '../utils/response';

export default class StudentsController extends Controller {
  static basePath = '/api/students';

  static mountController(app) {
    return new StudentsController(app);
  }

  // eslint-disable-next-line class-methods-use-this
  initialize() {
    this.app.post(
      StudentsController.basePath,
      StudentsController.createStudent
    );
    this.app.get(
      StudentsController.basePath,
      StudentsController.getAllStudents
    );
    this.app.get(
      `${StudentsController.basePath}/:id`,
      StudentsController.getStudentById
    );
    this.app.put(
      `${StudentsController.basePath}/:id`,
      StudentsController.updateStudent
    );
    this.app.delete(
      `${StudentsController.basePath}/:id`,
      StudentsController.deleteStudent
    );
  }

  static async createStudent(req, res) {
    try {
      const { firstName, lastName, major, semester } = req.body;
      const student = Student.newStudent(firstName, lastName, major, semester);
      await student.create();
      respond(res, OK, student);
    } catch (e) {
      StudentsController.handleUnknownError(res, e);
    }
  }

  static async getAllStudents(req, res) {
    try {
      const students = await new Student().get();
      respond(res, OK, students);
    } catch (e) {
      StudentsController.handleUnknownError(res, e);
    }
  }

  static async getStudentById(req, res) {
    try {
      const { id } = req.params;
      const student = await new Student(id).getByKey();

      if (!student) {
        respond(res, NOT_FOUND);
      } else {
        respond(res, OK, student);
      }
    } catch (e) {
      StudentsController.handleUnknownError(res, e);
    }
  }

  static async updateStudent(req, res) {
    try {
      const { id } = req.params;

      const student = await new Student(id).getByKey();

      if (!student) {
        respond(res, NOT_FOUND);
      } else {
        Student.updatableAttributes.forEach(att => {
          if (req.body[att]) {
            student[att] = req.body[att];
          }
        });

        student.updatedAt = new Date();

        await student.update();

        respond(res, OK, student);
      }
    } catch (e) {
      StudentsController.handleUnknownError(res, e);
    }
  }

  static async deleteStudent(req, res) {
    try {
      const { id } = req.params;
      await new Student(id).delete();
      respond(res, OK);
    } catch (e) {
      StudentsController.handleUnknownError(res, e);
    }
  }
}

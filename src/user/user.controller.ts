import * as express from 'express';
import { getRepository } from 'typeorm';
import UserNotFoundException from '../exceptions/PostNotFoundException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from './user.dto';
import User from './user.entity';

class UserController implements Controller {
  public path = '/users';
  public router = express.Router();
  public userRepository = getRepository(User);

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(this.path, validationMiddleware(CreateUserDto), this.createUser);
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.patch(`${this.path}/:id`, validationMiddleware(CreateUserDto, true), this.modifyUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }
  private createUser = async (request: express.Request, response: express.Response) => {
    const userData: CreateUserDto = request.body;
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    response.send(newUser);
  }
  private getAllUsers = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const users = await this.userRepository.find();
    response.send(users);
  }
  private getUserById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const userData: User = request.body;
    await this.userRepository.update(id, userData);
    const updatedUser = await this.userRepository.findOne(id);
    if (updatedUser) {
      response.send(updatedUser);
    } else {
      next(new UserNotFoundException(id));
    }
  }
  private modifyUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const userData: User = request.body;
    await this.userRepository.update(id, userData);
    const updatedUser = await this.userRepository.findOne(id);
    if (updatedUser) {
      response.send(updatedUser);
    } else {
      next(new UserNotFoundException(id));
    }
  }
  private deleteUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const deleteResponse = await this.userRepository.delete(id);
    if (deleteResponse.raw[1]) {
      response.sendStatus(200);
    } else {
      next(new UserNotFoundException(id));
    }
  }
}

export default UserController;

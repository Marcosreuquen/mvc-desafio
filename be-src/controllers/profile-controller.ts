import { Profile } from "../models/profile";

export class ProfileController {
  model;
  constructor() {
    this.model = Profile;
  }
  async createProfile(fullName: string, bio: string, dataURL: string) {
    return await this.model.create({ fullName, bio, dataURL });
  }
  async getProfile(id: number) {
    return await this.model.findOne({ where: { id } });
  }
}

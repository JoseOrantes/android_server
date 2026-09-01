import Profile from '../../models/profilemodel';

// Service for profile CRUD operations
export class ProfileService {
  async createProfile(userId: number, data: Partial<Profile>, options?: any) {
    return Profile.create({ ...data, userId } as any, options);
  }

  async getProfileByUserId(userId: number) {
    return Profile.findOne({ where: { userId } });
  }

  async updateProfile(userId: number, data: Partial<Profile>) {
    const [affected] = await Profile.update(data as any, { where: { userId } });
    return affected > 0;
  }
}

export default new ProfileService();
